#!/usr/bin/env node
import * as fs from 'fs/promises'
import * as path from 'path'

async function addPattern(patterns: string[]) {
  if (patterns.length === 0) {
    console.error('❌ Error: Please provide at least one pattern to add')
    console.error('Usage: claude-organize-add <pattern> [pattern2] ...')
    console.error('Example: claude-organize-add "*.json" "*.yaml"')
    process.exit(1)
  }

  const cwd = process.cwd()
  const envPath = path.join(cwd, '.env')
  
  try {
    // Read existing .env file or create empty content
    let envContent = ''
    try {
      envContent = await fs.readFile(envPath, 'utf-8')
    } catch (_e) {
      // File doesn't exist, that's ok
    }
    
    // Parse existing environment variables
    const lines = envContent.split('\n')
    const envVars: Map<string, string> = new Map()
    let skipPatternsIndex = -1
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key) {
          envVars.set(key.trim(), valueParts.join('=').trim())
          if (key.trim() === 'CLAUDE_ORGANIZE_SKIP_PATTERNS') {
            skipPatternsIndex = index
          }
        }
      }
    })
    
    // Get current skip patterns
    const currentSkipPatterns = envVars.get('CLAUDE_ORGANIZE_SKIP_PATTERNS')
    
    if (!currentSkipPatterns) {
      console.log('ℹ️  No custom skip patterns set. Cannot remove from default patterns.')
      console.log('💡 To customize skip patterns, first set CLAUDE_ORGANIZE_SKIP_PATTERNS in .env')
      console.log('   Example: CLAUDE_ORGANIZE_SKIP_PATTERNS=README.md,LICENSE,*.log')
      process.exit(1)
    }
    
    // Parse current patterns
    const currentPatternsList = currentSkipPatterns.split(',').map(p => p.trim()).filter(p => p)
    const patternsSet = new Set(currentPatternsList)
    
    // Remove the specified patterns
    const removedPatterns: string[] = []
    const notFoundPatterns: string[] = []
    
    patterns.forEach(pattern => {
      if (patternsSet.has(pattern)) {
        patternsSet.delete(pattern)
        removedPatterns.push(pattern)
      } else {
        notFoundPatterns.push(pattern)
      }
    })
    
    // Create new patterns string
    const newPatterns = Array.from(patternsSet).join(',')
    
    // Update the .env file
    if (skipPatternsIndex >= 0) {
      lines[skipPatternsIndex] = `CLAUDE_ORGANIZE_SKIP_PATTERNS=${newPatterns}`
    }
    
    // Write back to file
    await fs.writeFile(envPath, lines.join('\n'))
    
    // Report results
    if (removedPatterns.length > 0) {
      console.log('✅ Removed from skip patterns:')
      removedPatterns.forEach(p => console.log(`   - ${p}`))
      console.log('\n📁 These files will now be organized by Claude Organize')
    }
    
    if (notFoundPatterns.length > 0) {
      console.log('\nℹ️  Not found in skip patterns:')
      notFoundPatterns.forEach(p => console.log(`   - ${p}`))
    }
    
    console.log('\nCurrent skip patterns:')
    if (newPatterns) {
      newPatterns.split(',').forEach(p => console.log(`   - ${p}`))
    } else {
      console.log('   (none - all markdown files will be organized)')
    }
    
  } catch (error) {
    console.error('Error updating patterns:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2)
  addPattern(args).catch(console.error)
}