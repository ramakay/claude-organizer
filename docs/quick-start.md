# Quick Start Guide

Get Claude Organize up and running in 5 minutes.

## Installation

```bash
npm install -g claude-organize
```

## Setup with Claude Code

1. **Add hooks to your project**:
   Create or edit `.claude/settings.json`:

   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Write|Edit|MultiEdit",
           "hooks": [{ "type": "command", "command": "claude-organize" }]
         }
       ]
     }
   }
   ```

2. **Create a `.env` file** (optional):

   ```bash
   # Enable debug mode
   CLAUDE_ORGANIZE_DEBUG=true

   # Enable JavaScript organization (experimental)
   CLAUDE_ORGANIZE_JS=true
   CLAUDE_ORGANIZE_JS_MODE=safe
   ```

## Your First Organization

1. **Create a test file** with Claude Code:

   ```markdown
   # API Testing Guide

   This document explains how to test our API endpoints.
   ```

2. **Watch it get organized**:
   - File moves to `docs/testing/api-testing-guide.md`
   - Organization logged in `docs/organization-log.json`

## Using Slash Commands

Try these commands in Claude Code:

- `/claude-organize-bypass` - Toggle organization on/off
- `/claude-organize-add *.json` - Add JSON files to organization
- `/enhance Create API documentation` - Generate enhanced docs

## What Gets Organized

| File Type     | Example            | Destination             |
| ------------- | ------------------ | ----------------------- |
| Documentation | `debug-guide.md`   | `docs/troubleshooting/` |
| Scripts       | `check-status.mjs` | `scripts/checks/`       |
| Test files    | `test-api.js`      | `scripts/testing/`      |
| Deployment    | `deploy-prod.sh`   | `scripts/deployment/`   |

## Next Steps

- 📖 [View all categories](../docs/subcategories.md)
- ⚙️ [Configure organization](../docs/configuration.md)
- 🔧 [Enable JavaScript organization](../docs/js-organization-guide.md)
- 🛠️ [Troubleshooting](../docs/troubleshooting/)
