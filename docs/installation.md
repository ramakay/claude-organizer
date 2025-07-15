# Installation Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm 7.0.0 or higher
- Claude Code installed and configured

## Installation Methods

### Method 1: Global Installation (Recommended)

```bash
npm install -g claude-organize
```

### Method 2: Development Installation

```bash
git clone https://github.com/your-username/claude-organize.git
cd claude-organize
npm install
npm run build
npm link
```

## Verification

Verify the installation:

```bash
which claude-organize
claude-organize --version
```

## Hook Setup

### Using /hooks Command (Recommended)

1. In Claude Code, type: `/hooks`
2. Select `PostToolUse - After tool execution`
3. Choose `+ Add new matcher...`
4. Enter: `Write|Edit|MultiEdit`
5. Select `+ Add new hook...`
6. Enter command: `claude-organize`
7. Save to project settings

### Manual Configuration

Add to your `.claude/settings.json`:

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

## Testing Installation

Create a test file to verify everything works:

```bash
echo "# Test Document

This is a test document for claude-organize.

## Test Results
- All systems operational
- Hook integration working
- File organization active" > test-doc.md
```

The file should be automatically moved to `docs/testing/test-doc.md`.

## Next Steps

- Read the [Configuration Guide](configuration.md)
- Explore [examples](../examples/)
- Check [Troubleshooting](troubleshooting.md) if you encounter issues