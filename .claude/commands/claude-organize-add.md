---
description: Add file patterns to be organized (remove from skip list)
allowed-tools: Bash
---

Add file patterns to be organized by Claude Organize. This removes patterns from the skip list.

Usage: `/claude-organize-add <pattern> [pattern2] ...`

Examples:

- `/claude-organize-add *.json` - Allow JSON files to be organized
- `/claude-organize-add *.json *.yaml` - Add multiple patterns

⚠️ **WARNING for JavaScript/MJS files**:

- Skip patterns take precedence over JS safety checks
- If you remove `*.js` or `*.mjs` from skip patterns, they will ONLY be organized if:
  1. `CLAUDE_ORGANIZE_JS=true` is set
  2. They pass all safety validation checks
- Adding JS files to skip patterns will bypass ALL safety analysis

!`claude-organize-add $ARGUMENTS`

The command will:

- Remove the specified patterns from CLAUDE_ORGANIZE_SKIP_PATTERNS
- Update your .env file with the new settings
- Show which patterns were removed from the skip list
