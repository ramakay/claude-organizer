# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-07-16

### Added

- Initial release of Claude Organize
- AI-powered document categorization using Claude AI
- Automatic organization of markdown files into categorized directories
- PostToolUse hook integration with Claude Code
- Configurable skip patterns with comprehensive defaults
- Bypass mode for manual control
- Slash commands: `/claude-organize-bypass`, `/bypass`, `/claude-organize-add`, `/claude-organize-status`
- Support for 9 content categories plus cleanup category
- Smart detection distinguishing operational documentation from temporary files
- Environment variable configuration
- Organization logging with AI reasoning
- CLI commands: `claude-organize`, `claude-organize-bypass`, `claude-organize-add`
- TypeScript implementation with proper typing
- Comprehensive documentation

### Security

- Safe file operations with proper error handling
- Protection of system files and directories
- No external API calls except to Claude AI (when available)

[0.1.0]: https://github.com/ramakay/claude-organize/releases/tag/v0.1.0
