# Configuration Guide

## Environment Variables

Create a `.env` file in your project root:

```bash
# Custom log location (default: ./docs/organization-log.json)
CLAUDE_ORGANIZE_LOG_PATH=/custom/path/organization-log.json

# Enable debug logging
CLAUDE_ORGANIZE_DEBUG=true

# Custom base directory for organization (default: current directory)
CLAUDE_ORGANIZE_BASE_DIR=/custom/base/path
```

## Hook Configuration

### Project-Specific Settings

Create `.claude/settings.json` in your project:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "claude-organize"
          }
        ]
      }
    ]
  }
}
```

### Global Settings

Add to `~/.claude/settings.json` for global configuration:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "claude-organize"
          }
        ]
      }
    ]
  }
}
```

## Categories

Claude Organize categorizes files into these directories:

### Markdown Files → `docs/`
- `docs/testing/` - Test results, QA reports, validation outputs
- `docs/analysis/` - Data analysis, performance reports, investigations
- `docs/architecture/` - System design, technical architecture, patterns
- `docs/operations/` - Deployment guides, runbooks, operational docs
- `docs/development/` - Implementation details, code documentation
- `docs/planning/` - Project plans, roadmaps, specifications
- `docs/troubleshooting/` - Debug logs, issue investigations, fixes
- `docs/general/` - Miscellaneous documentation

### Shell Scripts → `scripts/`
- `scripts/` - All `.sh` files (build scripts, deployment scripts, etc.)

## Customization

### Custom Log Path

```bash
export CLAUDE_ORGANIZE_LOG_PATH="/my/custom/log/path.json"
```

### Debug Mode

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

### Custom Base Directory

```bash
export CLAUDE_ORGANIZE_BASE_DIR="/my/project/root"
```

## Advanced Configuration

### Excluding Files

Files already in organized directories are automatically skipped to prevent loops.

### Performance Tuning

- Claude AI timeout: 30 seconds (not configurable)
- Fallback to keyword analysis is automatic
- File processing is sequential for safety

## Troubleshooting Configuration

### Verify Hook Setup

```bash
# Check if claude-organize is in PATH
which claude-organize

# Test manual execution
echo '{"session_id":"test","transcript_path":"/tmp/test","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"./test.md","content":"# Test"}}' | claude-organize
```

### Debug Mode

Enable debug logging to see detailed processing:

```bash
CLAUDE_ORGANIZE_DEBUG=true claude-organize
```

### Check Organization Log

```bash
cat docs/organization-log.json
```

## Best Practices

1. **Use project-specific settings** for team consistency
2. **Enable debug mode** during initial setup
3. **Monitor organization logs** for accuracy
4. **Test with sample files** before full deployment
5. **Keep logs in version control** for transparency