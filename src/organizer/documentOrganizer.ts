import * as fs from 'fs/promises'
import * as path from 'path'
import { OrganizationResult } from '../contracts/types/OrganizationResult'
import { ToolOperation } from '../contracts/schemas/hookSchemas'
import { Config } from '../config/Config'
import { categories } from '../config/categories'
import { ModelClientProvider } from '../providers/ModelClientProvider'

interface OrganizationLogEntry {
  timestamp: string
  originalPath: string
  newPath: string
  category: string
  score: number
  reasoning: string
}

export async function documentOrganizer(
  operation: ToolOperation,
  config: Config
): Promise<OrganizationResult> {
  try {
    const filePath = operation.tool_input.file_path
    const fileName = path.basename(filePath)
    
    // Check if bypass is enabled
    if (config.bypassEnabled) {
      return {
        decision: undefined,
        reason: 'Organization bypassed via CLAUDE_ORGANIZE_BYPASS',
      }
    }

    // Check if file matches skip patterns
    const shouldSkip = config.skipPatterns.some(pattern => {
      // Handle directory patterns (e.g., .claude/*, node_modules/*)
      if (pattern.includes('/')) {
        // Check if the file path contains this directory pattern
        const dirPattern = pattern.replace(/\*/g, '.*').replace(/\./g, '\\.')
        const fullPathRegex = new RegExp(dirPattern)
        return fullPathRegex.test(filePath)
      }
      
      // Support exact matches and simple wildcards for file names
      if (pattern.includes('*')) {
        // Convert simple wildcard to regex
        const regexPattern = pattern.replace(/\*/g, '.*').replace(/\./g, '\\.')
        return new RegExp(`^${regexPattern}$`).test(fileName)
      }
      
      return fileName === pattern
    })

    if (shouldSkip) {
      return {
        decision: undefined,
        reason: `File ${fileName} matches skip pattern`,
      }
    }
    
    // Skip if already in docs directory
    if (filePath.includes('/docs/')) {
      return {
        decision: undefined,
        reason: 'File already organized',
      }
    }

    // Analyze the file content using Claude AI
    const analysis = await analyzeContentWithClaude(filePath)
    const targetDir = categories[analysis.category].dir
    const targetPath = path.join(config.organizationBaseDir, targetDir, fileName)

    // Create target directory if it doesn't exist
    await fs.mkdir(path.dirname(targetPath), { recursive: true })

    // Move the file
    await fs.rename(filePath, targetPath)

    // Log the organization
    const logEntry: OrganizationLogEntry = {
      timestamp: new Date().toISOString(),
      originalPath: filePath,
      newPath: targetPath,
      category: analysis.category,
      score: analysis.score,
      reasoning: analysis.reasoning,
    }

    await logOrganization(logEntry, config)

    if (config.debugEnabled) {
      console.error(JSON.stringify(logEntry, null, 2))
    }

    return {
      decision: undefined,
      reason: `Organized to ${targetDir}`,
    }

  } catch (error) {
    // If file doesn't exist yet (timing issue), just return success
    if ((error as any).code === 'ENOENT') {
      return {
        decision: undefined,
        reason: 'File not found - may still be writing',
      }
    }

    return {
      decision: undefined,
      reason: `Organization error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

async function analyzeContentWithClaude(filePath: string): Promise<{
  category: string
  score: number
  reasoning: string
}> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const fileName = path.basename(filePath)
    const fileExtension = path.extname(filePath)
    
    // Try Claude AI analysis first
    try {
      const modelProvider = new ModelClientProvider()
      const modelClient = modelProvider.getModelClient()
      
      const availableCategories = Object.keys(categories).filter(cat => cat !== 'general')
      
      const prompt = `Analyze this file and categorize it into one of these categories:

Available categories:
${availableCategories.map(cat => `- ${cat}: ${categories[cat].description}`).join('\n')}

File: ${fileName}
Content:
${content}

IMPORTANT: Distinguish between:
1. Files that ARE ABOUT testing/operations (e.g., describing test results, deployment procedures) - categorize by their primary content
2. Files that ARE temporary/cleanup items (e.g., marked with DELETE ME, TEMP, obsolete content) - categorize as "cleanup"

For example:
- A file documenting test procedures → "testing" 
- A file with "DELETE THIS" containing old test results → "cleanup"
- A deployment guide → "operations"
- A file named "temp-deploy-notes" marked obsolete → "cleanup"

Please respond with ONLY a JSON object in this format:
{
  "category": "category_name",
  "confidence": 0.85,
  "reasoning": "Brief explanation of why this category was chosen"
}

Choose the most appropriate category based on the file content. If none fit well, use "general".`

      const response = await modelClient.ask(prompt)
      
      // Try to parse Claude's response
      const cleanResponse = response.trim()
      const jsonMatch = cleanResponse.match(/\{[^}]+\}/)
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        
        if (parsed.category && availableCategories.includes(parsed.category)) {
          return {
            category: parsed.category,
            score: Math.round((parsed.confidence || 0.5) * 100),
            reasoning: `Claude AI: ${parsed.reasoning || 'Categorized by AI analysis'}`
          }
        }
      }
    } catch (claudeError) {
      console.error('Claude analysis failed, falling back to keyword analysis:', claudeError)
    }
    
    // Fallback to keyword-based analysis
    return await analyzeContentKeywordBased(filePath, content)
    
  } catch (error) {
    return {
      category: 'general',
      score: 0,
      reasoning: 'Error analyzing file, defaulting to general category'
    }
  }
}

async function analyzeContentKeywordBased(filePath: string, content: string): Promise<{
  category: string
  score: number
  reasoning: string
}> {
  const lowerContent = content.toLowerCase()
  const fileName = path.basename(filePath).toLowerCase()
  
  // Score each category based on content analysis
  const scores: Record<string, number> = {}
  
  for (const [category, config] of Object.entries(categories)) {
    if (category === 'general') continue // Skip general, it's the fallback
    
    let score = 0
    
    // Check keywords in content
    for (const keyword of config.keywords) {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const occurrences = (lowerContent.match(new RegExp(escapedKeyword, 'gi')) || []).length
      score += occurrences * 2 // Weight content matches heavily
    }
    
    // Check patterns in filename
    for (const pattern of config.patterns) {
      if (fileName.includes(pattern)) {
        score += 10 // Filename patterns are strong indicators
      }
    }
    
    // Check for specific content structures
    if (category === 'testing' && (content.includes('PASS') || content.includes('FAIL'))) {
      score += 15
    }
    if (category === 'architecture' && (content.includes('```mermaid') || content.includes('diagram'))) {
      score += 15
    }
    if (category === 'troubleshooting' && (content.includes('Error:') || content.includes('Stack trace'))) {
      score += 15
    }
    
    scores[category] = score
  }
  
  // Find the category with the highest score
  let bestCategory = 'general'
  let highestScore = 0
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score
      bestCategory = category
    }
  }
  
  // If no strong match, use general
  if (highestScore < 5) {
    bestCategory = 'general'
  }
  
  return {
    category: bestCategory,
    score: highestScore,
    reasoning: `Keyword analysis: Score ${highestScore}. Matched based on content analysis and filename patterns.`
  }
}

async function logOrganization(logEntry: OrganizationLogEntry, config: Config): Promise<void> {
  config.ensureLogDirectory()
  
  let logs: OrganizationLogEntry[] = []
  
  try {
    const existingLogs = await fs.readFile(config.logPath, 'utf-8')
    logs = JSON.parse(existingLogs)
  } catch (e) {
    // File doesn't exist yet, start with empty array
  }
  
  logs.push(logEntry)
  await fs.writeFile(config.logPath, JSON.stringify(logs, null, 2))
}