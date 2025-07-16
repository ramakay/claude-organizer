# Claude-Organize Testing Guide for Connectiva

## Why It's Not Working

The claude-organize hook requires Claude Code to pass specific hook data when files are written. The issue is that the hook is expecting:

```json
{
  "session_id": "...",
  "transcript_path": "...",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "...",
    "content": "..."
  }
}
```

But it seems the hook isn't receiving this data properly.

## Troubleshooting Steps

1. **Verify the hook is installed correctly**:

   ```bash
   cat ~/.claude/settings.json | grep -A 3 PostToolUse
   ```

2. **Test the hook manually** (from claude-organize directory):

   ```bash
   echo '{"session_id":"test","transcript_path":"test","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"test-utility.js","content":"console.log(\"test\");"}}' | npm run claude-organize
   ```

3. **Check if the hook is being called at all**:
   - Add a debug line to the beginning of the hook script
   - Or check if any process is spawned when Claude writes files

## Alternative Testing Method

Since the automatic hook might not be working, you can test claude-organize manually:

1. Have Claude create test files normally
2. Then manually run the organizer on those files:
   ```bash
   # From the claude-organize directory
   echo '{"session_id":"manual-test","transcript_path":"manual","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"'$PWD'/check-test.js","content":"console.log(\"test\");"}}' | npm run claude-organize
   ```

## What Should Happen

When working correctly:

1. Claude writes a file like `check-something.js`
2. The PostToolUse hook triggers automatically
3. claude-organize analyzes the file
4. If it matches safe patterns, it's moved to `scripts/`
5. A log entry is added to `docs/organization-log.json`

## Current Status

- ✅ claude-organize is installed globally
- ✅ Hook is configured in settings.json
- ✅ Connectiva .env has correct settings
- ❌ Hook doesn't seem to be triggering automatically
- ❓ May need to restart Claude Code or check hook permissions
