#!/usr/bin/env node
/* eslint-env node */

const fs = require('fs')
const path = require('path')
const os = require('os')

const ENHANCE_COMMAND = 'enhance.md'
const COMMANDS_DIR = path.join(__dirname, '..', 'commands')
const CLAUDE_COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands')

async function installEnhanceCommand() {
  try {
    // Create .claude/commands directory if it doesn't exist
    await fs.promises.mkdir(CLAUDE_COMMANDS_DIR, { recursive: true })

    // Copy enhance.md to .claude/commands
    const sourcePath = path.join(COMMANDS_DIR, ENHANCE_COMMAND)
    const destPath = path.join(CLAUDE_COMMANDS_DIR, ENHANCE_COMMAND)

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.warn(
        `Warning: ${ENHANCE_COMMAND} not found in package. Skipping command installation.`
      )
      return
    }

    // Copy the file
    await fs.promises.copyFile(sourcePath, destPath)
    console.log(`✅ Installed /enhance command to ${destPath}`)
  } catch (error) {
    console.error('Failed to install /enhance command:', error.message)
    // Don't fail the entire installation if this fails
  }
}

// Run if called directly
if (require.main === module) {
  installEnhanceCommand()
}

module.exports = { installEnhanceCommand }
