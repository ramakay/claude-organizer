# Troubleshooting Guide

## Common Issues

### Hook Not Triggering

**Symptoms:**
- Files are not being automatically organized
- No entries in organization log
- Manual execution works but automatic doesn't

**Solutions:**
1. **Verify Hook Configuration:**
   ```bash
   # Check if claude-organize is in PATH
   which claude-organize
   
   # Verify hook is registered
   cat .claude/settings.json | grep -A 10 "hooks"
   ```

2. **Use /hooks Command:**
   - Type `/hooks` in Claude Code
   - Ensure matcher is `Write|Edit|MultiEdit`
   - Ensure command is `claude-organize`

3. **Check Debug Output:**
   ```bash
   CLAUDE_ORGANIZE_DEBUG=true
   ```

### Claude AI Not Working

**Symptoms:**
- Organization log shows "Keyword analysis" instead of "Claude AI"
- Lower confidence scores (18-80 vs 90-95)
- Fallback reasoning messages

**Solutions:**
1. **Verify Claude Installation:**
   ```bash
   which claude
   claude --version
   ```

2. **Test Claude Access:**
   ```bash
   claude "Categorize this content: # Test Results"
   ```

3. **Check Timeout Issues:**
   - Default timeout is 30 seconds
   - Large files may timeout and fallback to keywords
   - This is expected behavior

### Files Not Moving

**Symptoms:**
- Files created but not organized
- No error messages
- Manual test works

**Common Causes:**
1. **File Already Organized:**
   - Files in `/docs/` subdirectories are skipped
   - This prevents infinite loops

2. **Unsupported File Type:**
   - Only `.md` and `.sh` files are processed
   - Other file types are ignored

3. **Permission Issues:**
   ```bash
   # Check file permissions
   ls -la filename.md
   
   # Check directory permissions
   ls -la docs/
   ```

### Permission Errors

**Symptoms:**
- "EACCES: permission denied" errors
- Files created but not moved
- Hook execution fails

**Solutions:**
1. **Check File Permissions:**
   ```bash
   chmod 644 filename.md
   ```

2. **Check Directory Permissions:**
   ```bash
   chmod 755 docs/
   chmod 755 docs/testing/
   ```

3. **Verify Write Access:**
   ```bash
   touch docs/test-file.md
   rm docs/test-file.md
   ```

### Installation Issues

**Symptoms:**
- `claude-organize: command not found`
- `npm install -g` fails
- Permission errors during installation

**Solutions:**
1. **Global Installation Issues:**
   ```bash
   # Check npm global path
   npm config get prefix
   
   # Install with sudo (if needed)
   sudo npm install -g claude-organize
   
   # Or use npx
   npx claude-organize
   ```

2. **Path Issues:**
   ```bash
   # Add to your shell profile
   export PATH="$PATH:$(npm config get prefix)/bin"
   ```

3. **Development Installation:**
   ```bash
   git clone https://github.com/your-username/claude-organize.git
   cd claude-organize
   npm install
   npm run build
   npm link
   ```

## Debug Information

### Enable Debug Mode

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

### Check Organization Log

```bash
cat docs/organization-log.json | tail -10
```

### Manual Testing

Test the hook manually:

```bash
echo '{"session_id":"test","transcript_path":"/tmp/test","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"./debug-test.md","content":"# Debug Test\n\nThis is a test file for debugging purposes."}}' | claude-organize
```

### Verify Hook Data Format

Expected input format:
```json
{
  "session_id": "test-session",
  "transcript_path": "/tmp/test",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.md",
    "content": "file content"
  }
}
```

## Performance Issues

### Large Files

**Symptoms:**
- Long processing times
- Timeout errors
- Fallback to keyword analysis

**Solutions:**
1. **Expected Behavior:**
   - Files over certain size may timeout
   - System automatically falls back to keyword analysis
   - This is normal and expected

2. **Optimization Tips:**
   - Keep files reasonably sized
   - Claude AI works best with focused content
   - Large files may not categorize as accurately

### Memory Issues

**Symptoms:**
- System slow down
- Node.js heap errors
- Processing failures

**Solutions:**
1. **Increase Node.js Memory:**
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" claude-organize
   ```

2. **Process Files in Batches:**
   - Hook processes files one at a time
   - No batch processing currently supported

## Getting Help

### Before Seeking Help

1. **Check the log:**
   ```bash
   cat docs/organization-log.json
   ```

2. **Enable debug mode:**
   ```bash
   CLAUDE_ORGANIZE_DEBUG=true
   ```

3. **Test manually:**
   ```bash
   echo '{"tool_name":"Write","tool_input":{"file_path":"test.md","content":"# Test"}}' | claude-organize
   ```

### Reporting Issues

Include the following information:

1. **Environment:**
   - OS and version
   - Node.js version
   - Claude Code version
   - claude-organize version

2. **Configuration:**
   - Hook configuration
   - Environment variables
   - Project structure

3. **Error Details:**
   - Exact error messages
   - Debug output
   - Organization log entries
   - Steps to reproduce

4. **Sample Files:**
   - Content that causes issues
   - Expected vs actual behavior

### Support Channels

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For general questions and help
- **Documentation:** Check all docs first

## Known Limitations

1. **File Types:** Only `.md` and `.sh` files are supported
2. **Claude AI Timeout:** 30 seconds maximum per file
3. **Sequential Processing:** Files processed one at a time
4. **No Batch Mode:** No support for processing multiple files at once
5. **Network Dependency:** Requires Claude Code installation for AI analysis

## Recovery Procedures

### Reset Organization

If files are organized incorrectly:

1. **Manual Move:**
   ```bash
   mv docs/wrong-category/file.md docs/correct-category/
   ```

2. **Update Log:**
   - Edit `docs/organization-log.json`
   - Update the file path entries

3. **Prevent Re-organization:**
   - Files in organized directories are skipped
   - No need to disable hook temporarily

### Clear Organization Log

```bash
# Backup current log
cp docs/organization-log.json docs/organization-log.json.backup

# Clear log
echo "[]" > docs/organization-log.json
```

### Emergency Disable

To temporarily disable organization:

1. **Remove Hook:**
   ```bash
   # Edit .claude/settings.json
   # Remove or comment out the hook configuration
   ```

2. **Or Use Different Command:**
   ```bash
   # Change command to something harmless
   "command": "echo 'hook disabled'"
   ```

## Security Considerations

⚠️ **Important Security Notice:**

As stated in the [Claude Code Hooks documentation](https://docs.anthropic.com/en/docs/claude-code/hooks#security-considerations):

> Hooks execute shell commands with your full user permissions without confirmation. You are responsible for ensuring your hooks are safe and secure. Anthropic is not liable for any data loss or system damage resulting from hook usage.

**Claude Organize Specific Risks:**

1. **File Movement:** This tool automatically moves files in your filesystem
2. **AI Analysis:** Sends file content to Claude AI for analysis
3. **Shell Execution:** Runs as a shell command with full user permissions
4. **No Confirmation:** Files are moved without user confirmation

**Risk Mitigation:**

1. **Review Source Code:** Inspect the code before installation
2. **Test in Isolated Environment:** Try in a test project first
3. **Monitor Organization Log:** Check `docs/organization-log.json` regularly
4. **Use Version Control:** Keep your project in git to track changes
5. **Backup Important Files:** Ensure you have backups of critical files

**Disclaimer:**

The claude-organize tool is provided as-is without warranty. Users are responsible for:
- Ensuring the tool meets their security requirements
- Backing up important files before use
- Understanding the risks of automated file movement
- Compliance with their organization's security policies

Anthropic, Claude Code, and the claude-organize maintainers are not liable for any data loss, system damage, or security issues resulting from the use of this tool.