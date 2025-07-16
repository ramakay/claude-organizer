# Configuration Guide

Customize Claude Organize to fit your project's needs.

## Environment Variables

Create a `.env` file in your project root:

```bash
# Basic Configuration
CLAUDE_ORGANIZE_BYPASS=false
CLAUDE_ORGANIZE_DEBUG=false

# Custom skip patterns (comma-separated)
CLAUDE_ORGANIZE_SKIP_PATTERNS=*.json,*.yml,my-custom-file.md

# Custom log path
CLAUDE_ORGANIZE_LOG_PATH=/custom/path/organization-log.json

# JavaScript Organization (Experimental)
CLAUDE_ORGANIZE_JS=false
CLAUDE_ORGANIZE_JS_MODE=safe
CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=false
```

## Skip Patterns

Control which files are never organized:

### Default Skip Patterns

```
README.md, LICENSE, CONTRIBUTING.md
package.json, package-lock.json, yarn.lock
.git/*, .gitignore, .gitmodules
dist/*, build/*, node_modules/*
*.config.js, *.config.ts, *.config.json
*.exe, *.dll, *.zip, *.tar.gz
```

### Adding Custom Skip Patterns

```bash
# Via environment variable
export CLAUDE_ORGANIZE_SKIP_PATTERNS="*.json,config/*,temp-*"

# Via slash command
/claude-organize-add *.json config/*
```

## Organizational Categories

### Documentation Categories

- `docs/testing/` - Test results, QA reports, validation outputs
- `docs/analysis/` - Data analysis, performance reports, investigations
- `docs/architecture/` - System design, technical architecture, patterns
- `docs/operations/` - Deployment guides, runbooks, operational docs
- `docs/development/` - Implementation details, code documentation
- `docs/planning/` - Project plans, roadmaps, specifications
- `docs/troubleshooting/` - Debug logs, issue investigations, fixes
- `docs/cleanup/` - Temporary files marked for deletion
- `docs/general/` - Miscellaneous documentation

### Script Subcategories

See [Subcategories Guide](subcategories.md) for detailed patterns.

## JavaScript Organization

**⚠️ EXPERIMENTAL FEATURE - DISABLED BY DEFAULT**

### Safety Levels

```bash
# Safe mode (recommended)
CLAUDE_ORGANIZE_JS_MODE=safe

# Aggressive mode (more risky)
CLAUDE_ORGANIZE_JS_MODE=aggressive
```

### Safety Checks

1. **Path Safety Check** - Validates file location
2. **Size Check** - Skips files over 10KB
3. **Import/Export Check** - Skips module files
4. **Pattern Matching** - Only moves known utility patterns

### Bypass Options (Testing Only)

```bash
# WARNING: Use with extreme caution
CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=true
```

## Logging & Monitoring

### Organization Log

Location: `docs/organization-log.json`

Example entry:

```json
{
  "timestamp": "2024-07-15T10:30:45.123Z",
  "originalPath": "./debug-api-config.md",
  "newPath": "./docs/troubleshooting/debug-api-config.md",
  "category": "troubleshooting",
  "score": 85,
  "reasoning": "File contains debugging information and error analysis"
}
```

### Debug Mode

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

Shows:

- Path safety check decisions
- Pattern matching results
- AI analysis reasoning
- Skip pattern matches

## Cross-Project Setup

For projects outside the claude-organize directory:

1. **Global .env setup**:

   ```bash
   # Set globally
   export CLAUDE_ORGANIZE_JS=true
   export CLAUDE_ORGANIZE_JS_MODE=safe
   ```

2. **Project-specific .env**:
   ```bash
   # In your project root
   echo "CLAUDE_ORGANIZE_JS=true" > .env
   echo "CLAUDE_ORGANIZE_JS_MODE=safe" >> .env
   ```

## Troubleshooting Configuration

### Common Issues

1. **Files not organizing**:
   - Check if file matches skip patterns
   - Verify `.env` file is in project root
   - Enable debug mode to see decisions

2. **JS files not organizing**:
   - Ensure `CLAUDE_ORGANIZE_JS=true`
   - Check if file passes safety validation
   - Review debug output for failure reasons

3. **Wrong category assignment**:
   - Check AI reasoning in organization log
   - Consider renaming file to match patterns
   - Report issues for AI model improvements

### Debug Commands

```bash
# Test organization manually
echo '{"tool_name": "Write", "tool_input": {"file_path": "/test/debug.md", "content": "# Debug guide"}}' | claude-organize

# Check configuration
claude-organize-status
```

## Advanced Configuration

### Custom Categories

Currently not supported - feature planned for future releases.

### API Integration

For programmatic access, see [API Documentation](api.md).

### Performance Tuning

- Use pattern matching over AI analysis when possible
- Batch organize multiple files
- Clear organization log periodically
