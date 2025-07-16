# JavaScript/MJS Organization Guide

This guide explains how to use claude-organize with JavaScript and MJS files, including troubleshooting and manual workflows.

## Prerequisites

1. Enable JS organization in your `.env`:

   ```
   CLAUDE_ORGANIZE_JS=true
   CLAUDE_ORGANIZE_JS_MODE=safe
   CLAUDE_ORGANIZE_DEBUG=true  # Optional, for troubleshooting
   ```

2. Ensure claude-organize is installed globally:
   ```bash
   npm install -g claude-organize
   ```

## How JS Organization Works

### Safety Layers

1. **Entry Point Check**: Only `.js` and `.mjs` files are processed
2. **Skip Patterns**: User-defined patterns in `CLAUDE_ORGANIZE_SKIP_PATTERNS` take precedence
3. **Path Safety Check**: Ensures files are within project directories
4. **Absolute Skip Patterns**: Never organizes core application files
5. **File Pattern Matching**: Only organizes files matching safe patterns
6. **Content Analysis**: AI analyzes file content for safety

### Safe File Patterns

In safe mode, only these patterns are organized:

- `check-*.js` / `check-*.mjs` - Check utilities
- `test-*.js` / `test-*.mjs` - Test utilities
- `debug-*.js` / `debug-*.mjs` - Debug scripts
- `analyze-*.js` / `analyze-*.mjs` - Analysis tools
- `cleanup-*.js` / `cleanup-*.mjs` - Cleanup scripts
- `temp-*.js` / `temp-*.mjs` - Temporary files
- And more (see `src/config/jsSafetyConfig.ts`)

## Automatic Organization (When Hook Works)

When working correctly with Claude Code:

1. Claude writes a JS file (e.g., `check-system.js`)
2. PostToolUse hook triggers automatically
3. claude-organize analyzes the file
4. If safe, moves to `scripts/` directory
5. Logs to `docs/organization-log.json`

## Manual Organization Workflow

When hooks don't trigger (common in external projects):

### Option 1: Direct Command

```bash
# Create your utility file
echo 'console.log("Hello");' > check-utility.js

# Manually trigger organization
echo '{"session_id":"manual","transcript_path":"manual","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"'$PWD'/check-utility.js","content":"dummy"}}' | claude-organize
```

### Option 2: With Environment Variables

```bash
# For debugging
CLAUDE_ORGANIZE_DEBUG=true claude-organize < input.json

# To bypass path safety check (use cautiously)
CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=true claude-organize < input.json
```

### Option 3: Create a Helper Script

Create `organize-js.sh`:

```bash
#!/bin/bash
FILE="$1"
if [ -z "$FILE" ]; then
  echo "Usage: ./organize-js.sh <file.js>"
  exit 1
fi

FULL_PATH=$(realpath "$FILE")
JSON_INPUT=$(cat <<EOF
{
  "session_id": "manual",
  "transcript_path": "manual",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "$FULL_PATH",
    "content": "dummy"
  }
}
EOF
)

echo "$JSON_INPUT" | CLAUDE_ORGANIZE_JS=true claude-organize
```

Then use:

```bash
chmod +x organize-js.sh
./organize-js.sh check-something.js
```

## Troubleshooting

### Hook Not Triggering

**Symptoms**: Files created by Claude aren't organized automatically

**Causes**:

1. Working directory mismatch
2. Environment variables not loaded from project `.env`
3. Claude Code session limitations

**Solutions**:

1. Use manual workflow (see above)
2. Ensure `.env` exists in project root
3. Restart Claude Code session

### Path Safety Check Failures

**Symptoms**: `Failed validation: Path Safety Check`

**Debug**:

```bash
CLAUDE_ORGANIZE_DEBUG=true claude-organize < input.json
```

**Solutions**:

1. Ensure file is within a project directory
2. Use bypass flag: `CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=true`
3. Place files in subdirectories like `src/`

### File Not Matching Safe Patterns

**Symptoms**: `Safe mode: File doesn't match safe utility patterns`

**Solutions**:

1. Rename file to match patterns (e.g., `check-*.js`)
2. Switch to aggressive mode: `CLAUDE_ORGANIZE_JS_MODE=aggressive`
3. Add custom patterns to skip list to exclude from organization

## Environment Variables

| Variable                               | Description                        | Default |
| -------------------------------------- | ---------------------------------- | ------- |
| `CLAUDE_ORGANIZE_JS`                   | Enable JS/MJS organization         | `false` |
| `CLAUDE_ORGANIZE_JS_MODE`              | `safe` or `aggressive`             | `safe`  |
| `CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK` | Bypass path safety check           | `false` |
| `CLAUDE_ORGANIZE_DEBUG`                | Enable debug logging               | `false` |
| `CLAUDE_ORGANIZE_SKIP_PATTERNS`        | Patterns to skip (comma-separated) | -       |

## Best Practices

1. **Always use safe mode** for production projects
2. **Test in isolation** before enabling in critical projects
3. **Review logs** regularly: `docs/organization-log.json`
4. **Backup first**: Keep backups before bulk organization
5. **Start small**: Test with individual files before batch processing

## Known Limitations

1. **Cross-project hooks**: PostToolUse hooks may not trigger reliably in projects outside claude-organize
2. **Relative paths**: Hook provides absolute paths which complicates depth calculation
3. **Environment loading**: Project-specific `.env` files may not load in hooks

## Future Improvements

- Better cross-project support
- Configurable safety rules
- Watch mode for continuous organization
- Integration with popular editors

## Getting Help

1. Check debug output: `CLAUDE_ORGANIZE_DEBUG=true`
2. Review organization log: `docs/organization-log.json`
3. File issues: [GitHub Issues](https://github.com/your-repo/claude-organize/issues)

## Example Workflow

```bash
# 1. Enable JS organization
echo "CLAUDE_ORGANIZE_JS=true" >> .env

# 2. Create a test utility
cat > check-database.js << 'EOF'
#!/usr/bin/env node
console.log("Checking database connection...");
// Add your utility code here
process.exit(0);
EOF

# 3. Organize manually
./organize-js.sh check-database.js

# 4. Verify
ls scripts/check-database.js
cat docs/organization-log.json | tail -20
```

Remember: Safety first! claude-organize is designed to be extremely cautious with JavaScript files to prevent breaking your applications.
