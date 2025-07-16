# Enable JavaScript/MJS Organization (Experimental)

## ⚠️ WARNING: EXPERIMENTAL FEATURE

This command enables JavaScript/MJS file organization, which is **DISABLED by default** for safety reasons.

## What This Command Does

When you run this command, Claude Organize will:

1. Show you important warnings about the risks
2. Ask for confirmation before enabling
3. Let you choose between 'safe' and 'aggressive' modes
4. Enable JS organization for your current project

## Safety Considerations

### Files That WILL Be Organized:

- Utility scripts like `check-*.js`, `test-*.js`, `debug-*.js`
- Standalone scripts with no exports
- CLI tools with shebang lines
- Test data generators and debugging utilities

### Files That Will NEVER Be Touched:

- ❌ Any file in `src/`, `lib/`, `dist/`, `build/`
- ❌ Files with `export` or `module.exports`
- ❌ React/Vue/Angular components
- ❌ Config files (`*.config.js`)
- ❌ Package entry points (`index.js`, `main.js`)

## Modes Available

### Safe Mode (Recommended)

- Only organizes files matching known utility patterns
- Most conservative approach
- Pattern-based detection only

### Aggressive Mode

- Uses AI analysis with 95% confidence requirement
- Can detect more utility scripts
- Higher risk of false positives

## Before Enabling

**CRITICAL CHECKLIST:**

- [ ] Your project is under version control (Git)
- [ ] You have committed all changes
- [ ] You have tested on a non-critical project first
- [ ] You understand the risks involved
- [ ] You will monitor the organization log

## How to Use

Simply type:

```
/claude-organize-js
```

Claude will guide you through the process with appropriate warnings and confirmations.

## To Disable

If you need to disable JS organization:

```bash
unset CLAUDE_ORGANIZE_JS
```

Or in your `.env` file:

```bash
CLAUDE_ORGANIZE_JS=false
```

## Remember

**This feature is experimental**. Even with all safety measures, there's always a risk when moving JavaScript files. Use with extreme caution and always have backups!
