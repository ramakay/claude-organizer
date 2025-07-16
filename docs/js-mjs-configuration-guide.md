# JavaScript/MJS Organization Configuration Guide

## Problem Solved

The issue with JavaScript/MJS files not being organized in certain projects was due to overly restrictive safety checks in 'safe' mode. The solution requires specific configuration settings.

## Working Configuration

To enable JavaScript/MJS file organization, add these settings to your project's `.env` file:

```bash
# Enable JavaScript/MJS organization
CLAUDE_ORGANIZE_JS=true

# Use aggressive mode for better MJS detection
CLAUDE_ORGANIZE_JS_MODE=aggressive

# Enable debug output to see what's happening
CLAUDE_ORGANIZE_DEBUG=true

# Bypass path safety checks (required for complex project structures)
CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=true
```

## Key Differences Between Modes

### Safe Mode

- Only organizes files that match specific safe utility patterns (e.g., `check-*.js`, `test-*.js`)
- Requires strong utility indicators in the code
- More restrictive path depth validation
- May skip many legitimate utility scripts

### Aggressive Mode

- Uses AI analysis to determine if files are utilities
- More flexible pattern matching
- Better at recognizing MJS modules as scripts
- Recommended for projects with many utility files

## Why Bypass Path Check?

The path safety check can be too restrictive for:

- Deep project structures
- Projects with complex directory hierarchies
- Files that are legitimately at the project root but need organization

## Results

With the correct configuration:

- ✅ `.mjs` files are properly recognized and organized
- ✅ Files are moved to appropriate directories (e.g., `scripts/`)
- ✅ Both new and existing files are processed
- ✅ AI provides 95% confidence scores for legitimate scripts

## Example Organization Results

```json
{
  "originalPath": "/path/to/project/test-organize.mjs",
  "newPath": "/path/to/project/scripts/test-organize.mjs",
  "category": "scripts",
  "score": 95,
  "reasoning": "This is an executable Node.js script (.mjs)..."
}
```

## Recommendations

1. **For Active Development Projects**: Use the full configuration above
2. **For Production**: Consider keeping `CLAUDE_ORGANIZE_JS_MODE=aggressive` but removing the bypass flag after initial organization
3. **For Conservative Approach**: Start with safe mode and test thoroughly before switching to aggressive

## Testing

To verify the configuration works:

1. Create a test MJS file:

```javascript
#!/usr/bin/env node
console.log('Test MJS organization')
```

2. Save it as `test-organize.mjs` in your project root
3. The file should be automatically moved to `scripts/` directory
4. Check `docs/organization-log.json` for details
