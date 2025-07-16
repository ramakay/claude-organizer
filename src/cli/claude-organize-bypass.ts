#!/usr/bin/env node
import * as fs from 'fs/promises'
import * as path from 'path'

async function toggleBypass() {
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
    let bypassIndex = -1
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key) {
          envVars.set(key.trim(), valueParts.join('=').trim())
          if (key.trim() === 'CLAUDE_ORGANIZE_BYPASS') {
            bypassIndex = index
          }
        }
      }
    })
    
    // Toggle bypass state
    const currentBypass = envVars.get('CLAUDE_ORGANIZE_BYPASS') === 'true'
    const newBypass = !currentBypass
    
    if (bypassIndex >= 0) {
      // Update existing line
      lines[bypassIndex] = `CLAUDE_ORGANIZE_BYPASS=${newBypass}`
    } else {
      // Add new line
      if (envContent && !envContent.endsWith('\n')) {
        lines.push('')
      }
      lines.push(`CLAUDE_ORGANIZE_BYPASS=${newBypass}`)
    }
    
    // Write back to file
    await fs.writeFile(envPath, lines.join('\n'))
    
    // Report status
    console.log(`Claude Organize bypass is now ${newBypass ? 'ENABLED' : 'DISABLED'}`)
    console.log(`Location: ${envPath}`)
    
    if (newBypass) {
      console.log('\nFiles will NOT be automatically organized.')
      console.log('Standard GitHub files (README.md, LICENSE, etc.) can be created in the root.')
    } else {
      console.log('\nFiles will be automatically organized into docs/ subdirectories.')
      console.log('Note: Files matching skip patterns will still be excluded.')
    }
    
    // Show current skip patterns if any
    const skipPatterns = envVars.get('CLAUDE_ORGANIZE_SKIP_PATTERNS')
    if (skipPatterns) {
      console.log(`\nCurrent skip patterns: ${skipPatterns}`)
    }
    
  } catch (error) {
    console.error('Error toggling bypass:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  toggleBypass().catch(console.error)
}