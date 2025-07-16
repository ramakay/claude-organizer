#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim())
    })
  })
}

async function showWarning() {
  console.log(`
🚨 ⚠️  EXPERIMENTAL FEATURE WARNING ⚠️  🚨
==========================================

You are about to enable JavaScript/MJS file organization.
This feature is DISABLED BY DEFAULT for good reasons:

1. JavaScript files might be critical to your application
2. Moving the wrong file could break your project
3. Even with safety checks, mistakes can happen

CLAUDE ORGANIZE WILL ATTEMPT TO ORGANIZE:
✓ Utility scripts (check-*.js, test-*.js, debug-*.js, etc.)
✓ Standalone scripts with no exports
✓ CLI tools and test generators

CLAUDE ORGANIZE WILL NEVER TOUCH:
✗ Files in src/, lib/, dist/, build/
✗ Files with exports or module.exports
✗ React/Vue/Angular components
✗ Config files (*.config.js)
✗ Package entry points (index.js, main.js)

BEFORE PROCEEDING, ENSURE:
□ Your project is under version control (Git)
□ All changes are committed
□ You have backups of important files
□ You've tested on a non-critical project first

`)
}

async function enableJsOrganization() {
  await showWarning()

  const proceed = await askQuestion(
    'Do you understand the risks and want to proceed? (yes/no): '
  )

  if (proceed !== 'yes') {
    console.log('\n✅ Good choice! JS organization remains disabled.')
    rl.close()
    return
  }

  console.log('\nChoose organization mode:')
  console.log(
    '1. Safe mode (recommended) - Only organizes files matching known utility patterns'
  )
  console.log(
    '2. Aggressive mode - Uses AI analysis with 95% confidence requirement'
  )

  const mode = await askQuestion('\nEnter 1 or 2: ')

  const modeValue = mode === '2' ? 'aggressive' : 'safe'

  // Update or create .env file
  const envPath = path.join(process.cwd(), '.env')
  let envContent = ''

  try {
    envContent = fs.readFileSync(envPath, 'utf-8')
  } catch {
    // .env doesn't exist, we'll create it
  }

  // Remove existing JS settings
  const lines = envContent
    .split('\n')
    .filter(
      (line) =>
        !line.startsWith('CLAUDE_ORGANIZE_JS=') &&
        !line.startsWith('CLAUDE_ORGANIZE_JS_MODE=')
    )

  // Add new settings
  lines.push('# JavaScript organization (experimental feature)')
  lines.push('CLAUDE_ORGANIZE_JS=true')
  lines.push(`CLAUDE_ORGANIZE_JS_MODE=${modeValue}`)

  fs.writeFileSync(envPath, lines.join('\n'))

  console.log(`
✅ JavaScript organization has been enabled in ${modeValue} mode!

Settings written to: ${envPath}

IMPORTANT REMINDERS:
- Monitor the organization log at: docs/organization-log.json
- Test with a few files first before bulk operations
- Keep your Git commits frequent
- To disable: Set CLAUDE_ORGANIZE_JS=false in .env

Happy organizing! (But please be careful! 🙏)
`)

  rl.close()
}

async function main() {
  try {
    await enableJsOrganization()
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    rl.close()
    process.exit(1)
  }
}

main()
