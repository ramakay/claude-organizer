import * as fs from 'fs/promises'
import * as path from 'path'
import { OrganizationResult } from '../contracts/types/OrganizationResult'
import { ToolOperation } from '../contracts/schemas/hookSchemas'
import { Config } from '../config/Config'
import { categories } from '../config/categories'
import { ModelClientProvider } from '../providers/ModelClientProvider'
import { jsSafetyConfig, jsAnalysisPrompt } from '../config/jsSafetyConfig'

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
    const shouldSkip = config.skipPatterns.some((pattern) => {
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

    // Check file extension
    const fileExt = path.extname(fileName).toLowerCase()
    const supportedExtensions = ['.md', '.txt', '.sh']
    const jsExtensions = ['.js', '.mjs']

    // If not a supported extension, skip
    if (
      !supportedExtensions.includes(fileExt) &&
      !jsExtensions.includes(fileExt)
    ) {
      return {
        decision: undefined,
        reason: `File extension ${fileExt} not supported for organization`,
      }
    }

    // If it's a JS/MJS file, check if JS organization is enabled
    if (jsExtensions.includes(fileExt)) {
      if (!config.jsOrganizationEnabled) {
        return {
          decision: undefined,
          reason:
            'JS/MJS organization is disabled. Set CLAUDE_ORGANIZE_JS=true to enable',
        }
      }

      const jsDecision = await analyzeJavaScriptFileWithExtremeCare(
        filePath,
        config
      )
      if (!jsDecision.shouldOrganize) {
        return {
          decision: undefined,
          reason: jsDecision.reason,
        }
      }
    }

    // Analyze the file content using Claude AI
    const analysis = await analyzeContentWithClaude(filePath)
    const targetDir = categories[analysis.category].dir
    const targetPath = path.join(
      config.organizationBaseDir,
      targetDir,
      fileName
    )

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
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
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

    // Try Claude AI analysis first
    try {
      const modelProvider = new ModelClientProvider()
      const modelClient = modelProvider.getModelClient()

      const availableCategories = Object.keys(categories).filter(
        (cat) => cat !== 'general'
      )

      const prompt = `Analyze this file and categorize it into one of these categories:

Available categories:
${availableCategories.map((cat) => `- ${cat}: ${categories[cat].description}`).join('\n')}

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
            reasoning: `Claude AI: ${parsed.reasoning || 'Categorized by AI analysis'}`,
          }
        }
      }
    } catch (claudeError) {
      console.error(
        'Claude analysis failed, falling back to keyword analysis:',
        claudeError
      )
    }

    // Fallback to keyword-based analysis
    return await analyzeContentKeywordBased(filePath, content)
  } catch (_error) {
    return {
      category: 'general',
      score: 0,
      reasoning: 'Error analyzing file, defaulting to general category',
    }
  }
}

async function analyzeContentKeywordBased(
  filePath: string,
  content: string
): Promise<{
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
      const occurrences = (
        lowerContent.match(new RegExp(escapedKeyword, 'gi')) || []
      ).length
      score += occurrences * 2 // Weight content matches heavily
    }

    // Check patterns in filename
    for (const pattern of config.patterns) {
      if (fileName.includes(pattern)) {
        score += 10 // Filename patterns are strong indicators
      }
    }

    // Check for specific content structures
    if (
      category === 'testing' &&
      (content.includes('PASS') || content.includes('FAIL'))
    ) {
      score += 15
    }
    if (
      category === 'architecture' &&
      (content.includes('```mermaid') || content.includes('diagram'))
    ) {
      score += 15
    }
    if (
      category === 'troubleshooting' &&
      (content.includes('Error:') || content.includes('Stack trace'))
    ) {
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
    reasoning: `Keyword analysis: Score ${highestScore}. Matched based on content analysis and filename patterns.`,
  }
}

async function analyzeJavaScriptFileWithExtremeCare(
  filePath: string,
  config: Config
): Promise<{ shouldOrganize: boolean; reason: string }> {
  try {
    const fileName = path.basename(filePath)

    // Step 1: Check absolute skip patterns for JS files
    for (const pattern of jsSafetyConfig.absoluteSkipPatterns) {
      const regexPattern = pattern
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
        .replace(/\./g, '\\.')
        .replace(/\{([^}]+)\}/g, '($1)')

      if (new RegExp(regexPattern).test(filePath)) {
        return {
          shouldOrganize: false,
          reason: `JS file matches absolute skip pattern: ${pattern}`,
        }
      }
    }

    // Step 2: Pre-flight validation passes
    const content = await fs.readFile(filePath, 'utf-8')

    for (const validationPass of jsSafetyConfig.validationPasses) {
      if (
        !validationPass.check(
          validationPass.name === 'Size Check' ? content : filePath
        )
      ) {
        return {
          shouldOrganize: false,
          reason: `Failed validation: ${validationPass.name}`,
        }
      }
    }

    // Step 3: Check for danger indicators
    let dangerCount = 0
    const foundDangers: string[] = []

    for (const pattern of jsSafetyConfig.dangerIndicators.patterns) {
      if (pattern.test(content)) {
        dangerCount++
        foundDangers.push(pattern.source)
      }
    }

    if (dangerCount > jsSafetyConfig.dangerIndicators.maxAllowed) {
      return {
        shouldOrganize: false,
        reason: `Found ${dangerCount} danger indicators: ${foundDangers.slice(0, 3).join(', ')}...`,
      }
    }

    // Step 4: Check for utility indicators
    let utilityCount = 0
    const foundUtilities: string[] = []

    for (const pattern of jsSafetyConfig.utilityIndicators.patterns) {
      if (pattern.test(content)) {
        utilityCount++
        foundUtilities.push(pattern.source)
      }
    }

    // Step 5: Check if filename matches safe utility patterns
    let matchesSafePattern = false
    for (const pattern of jsSafetyConfig.safeUtilityPatterns) {
      const regexPattern = pattern
        .replace(/\*/g, '.*')
        .replace(/\./g, '\\.')
        .replace(/\{([^}]+)\}/g, '($1)')

      if (new RegExp(`^${regexPattern}$`).test(fileName)) {
        matchesSafePattern = true
        break
      }
    }

    // If no utility indicators and doesn't match safe patterns, skip
    if (
      utilityCount < jsSafetyConfig.utilityIndicators.required &&
      !matchesSafePattern
    ) {
      return {
        shouldOrganize: false,
        reason:
          "No utility indicators found and filename doesn't match safe patterns",
      }
    }

    // In safe mode, only organize if it matches safe patterns
    if (config.jsOrganizationMode === 'safe') {
      if (matchesSafePattern && utilityCount >= 1) {
        return {
          shouldOrganize: true,
          reason: `Safe mode: Matches utility pattern and has ${utilityCount} utility indicators`,
        }
      }
      return {
        shouldOrganize: false,
        reason: "Safe mode: File doesn't match safe utility patterns",
      }
    }

    // Step 6: AI Analysis with extreme caution
    if (config.debugEnabled) {
      console.error(`🔍 Performing ultra-careful AI analysis on ${fileName}...`)
    }

    const modelProvider = new ModelClientProvider()
    const modelClient = modelProvider.getModelClient()

    if (!modelClient) {
      // If no AI available, only organize if it strongly matches safe patterns
      if (matchesSafePattern && utilityCount >= 2) {
        return {
          shouldOrganize: true,
          reason: 'Matches safe utility patterns with multiple indicators',
        }
      }
      return {
        shouldOrganize: false,
        reason:
          'Cannot perform AI analysis and insufficient utility indicators',
      }
    }

    // Prepare content for analysis (limit to 8KB for efficiency)
    const contentForAnalysis = content.substring(0, 8192)
    const analysisPrompt = jsAnalysisPrompt
      .replace('{{{content}}}', contentForAnalysis)
      .replace('{{{filePath}}}', filePath)

    const response = await modelClient.ask(analysisPrompt)

    // Parse AI response
    try {
      const cleanResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      const analysis = JSON.parse(cleanResponse)

      if (
        analysis.decision === 'organize' &&
        analysis.confidence >= jsSafetyConfig.MIN_CONFIDENCE_THRESHOLD
      ) {
        if (config.debugEnabled) {
          console.error(
            `✅ AI approved organization with ${analysis.confidence}% confidence`
          )
          console.error(`Reasoning: ${analysis.reasoning}`)
        }
        return {
          shouldOrganize: true,
          reason: `AI analysis: ${analysis.confidence}% confident. ${analysis.file_purpose}`,
        }
      } else {
        if (config.debugEnabled) {
          console.error(`❌ AI rejected organization: ${analysis.reasoning}`)
          console.error(`Risk factors: ${analysis.risk_factors?.join(', ')}`)
        }
        return {
          shouldOrganize: false,
          reason: `AI analysis: ${analysis.reasoning} (confidence: ${analysis.confidence}%)`,
        }
      }
    } catch (_parseError) {
      // If AI response can't be parsed, err on the side of caution
      return {
        shouldOrganize: false,
        reason: 'AI analysis response invalid - skipping for safety',
      }
    }
  } catch (error) {
    // Any error means we skip the file for safety
    return {
      shouldOrganize: false,
      reason: `Error during analysis: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

async function logOrganization(
  logEntry: OrganizationLogEntry,
  config: Config
): Promise<void> {
  config.ensureLogDirectory()

  let logs: OrganizationLogEntry[] = []

  try {
    const existingLogs = await fs.readFile(config.logPath, 'utf-8')
    logs = JSON.parse(existingLogs)
  } catch (_e) {
    // File doesn't exist yet, start with empty array
  }

  logs.push(logEntry)
  await fs.writeFile(config.logPath, JSON.stringify(logs, null, 2))
}
