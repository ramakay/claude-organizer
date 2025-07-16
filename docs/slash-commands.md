# Slash Commands

Claude Organize provides slash commands for easy control within Claude Code.

## /claude_organize_bypass

Toggles the bypass mode for the current project.

### Usage

```
/claude_organize_bypass
```

### What it does

- **When enabling bypass**: Stops all automatic file organization
- **When disabling bypass**: Resumes automatic file organization
- **Persists setting**: Updates the project's `.env` file

### Example Output

```
Claude Organize bypass is now ENABLED
Location: /path/to/project/.env

Files will NOT be automatically organized.
Standard GitHub files (README.md, LICENSE, etc.) can be created in the root.
```

### Use Cases

1. **Creating GitHub files**: Enable bypass when you need to create README.md, LICENSE, etc.
2. **Temporary disable**: When working on files you don't want moved
3. **Project setup**: During initial project configuration

### Alternative Methods

You can also control bypass mode through:

1. **Environment variable**:
   ```bash
   export CLAUDE_ORGANIZE_BYPASS=true
   ```

2. **Project .env file**:
   ```
   CLAUDE_ORGANIZE_BYPASS=true
   ```

3. **Command line**:
   ```bash
   claude-organize-bypass
   ```

## Future Slash Commands

Planned slash commands for future releases:

- `/claude_organize_status` - Show current organization settings
- `/claude_organize_skip` - Manage skip patterns interactively
- `/claude_organize_log` - View recent organization activities