# Claude Organize

<div align="center">

<h3 align="center">Claude Organize</h3>

  <p align="center">
    Intelligent document organization for Claude Code using AI-powered categorization
    <br />
    <a href="https://github.com/ramakay/claude-organize"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#usage">View Usage</a>
    ·
    <a href="https://github.com/ramakay/claude-organize/issues">Report Bug</a>
    ·
    <a href="https://github.com/ramakay/claude-organize/issues">Request Feature</a>
  </p>
</div>

## About The Project

Claude Organize is an intelligent document organization system that automatically categorizes and organizes your markdown files and shell scripts as you work with Claude Code. It uses AI to understand the content of your files and places them in appropriate directories, keeping your project structure clean and organized.

### Key Features

- 🤖 **AI-Powered Categorization** - Uses Claude AI to intelligently analyze file content
- 📁 **Automatic Organization** - Files are organized into appropriate directories based on their content
- 🔧 **Configurable** - Customize skip patterns, organization rules, and categories
- 🎯 **Smart Detection** - Distinguishes between documentation about operations vs temporary files
- 🛡️ **Safe Defaults** - Protects important files like README, LICENSE, .git, etc.
- 🔄 **Toggle On/Off** - Easy bypass mode for when you need manual control
- 📝 **Slash Commands** - Built-in Claude Code commands for easy management

### Built With

* [![TypeScript][TypeScript]][TypeScript-url]
* [![Node.js][Node.js]][Node-url]
* Claude AI API

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Claude Code (for hook integration)

### Installation

#### Via npm (recommended)

```bash
npm install -g claude-organize
```

#### From source

1. Clone the repo
   ```bash
   git clone https://github.com/ramakay/claude-organize.git
   cd claude-organize
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the project
   ```bash
   npm run build
   ```

4. Link globally
   ```bash
   npm link
   ```

## Usage

### Setting up with Claude Code

1. **Configure Claude Code hooks** in `.claude/settings.json`:
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

2. **Files will be automatically organized** when you create or edit them with Claude Code.

### Slash Commands

Claude Organize provides several slash commands when used with Claude Code:

- `/claude-organize-bypass` - Toggle organization on/off
- `/bypass` - Quick toggle (shorter alias)
- `/claude-organize-add <pattern>` - Add patterns to be organized
- `/claude-organize-status` - Show current configuration

### Categories

Files are organized into these directories:

- `docs/testing/` - Test results, QA reports, validation outputs
- `docs/analysis/` - Data analysis, performance reports, investigations
- `docs/architecture/` - System design, technical architecture, patterns
- `docs/operations/` - Deployment guides, runbooks, operational docs
- `docs/development/` - Implementation details, code documentation
- `docs/planning/` - Project plans, roadmaps, specifications
- `docs/troubleshooting/` - Debug logs, issue investigations, fixes
- `docs/cleanup/` - Temporary files marked for deletion
- `docs/general/` - Miscellaneous documentation
- `scripts/` - Shell scripts and automation files

### Configuration

Create a `.env` file to customize behavior:

```bash
# Bypass organization completely
CLAUDE_ORGANIZE_BYPASS=true

# Custom skip patterns (comma-separated)
CLAUDE_ORGANIZE_SKIP_PATTERNS=*.json,*.yml,my-custom-file.md

# Enable debug logging
CLAUDE_ORGANIZE_DEBUG=true

# Custom log path
CLAUDE_ORGANIZE_LOG_PATH=/custom/path/organization-log.json
```

### Skip Patterns

By default, Claude Organize skips:
- Root documentation (README.md, LICENSE, CONTRIBUTING.md, etc.)
- Version control (.git/*, .gitignore, etc.)
- Package files (package.json, package-lock.json, etc.)
- Build directories (dist/*, build/*, node_modules/*)
- Configuration files (.*rc, *.config.*, etc.)
- Binary files (*.exe, *.dll, *.zip, etc.)
- And many more (see docs/configuration.md for full list)

## Roadmap

- [x] AI-powered content categorization
- [x] Configurable skip patterns
- [x] Bypass mode
- [x] Slash commands integration
- [x] Cleanup category for temporary files
- [ ] Custom category definitions
- [ ] Multi-language support
- [ ] Integration with other editors
- [ ] Batch organization command

See the [open issues](https://github.com/ramakay/claude-organize/issues) for a full list of proposed features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Rama Annaswamy - [@ramakay](https://github.com/ramakay)

Project Link: [https://github.com/ramakay/claude-organize](https://github.com/ramakay/claude-organize)

## Acknowledgments

* Claude AI for intelligent categorization
* Claude Code team for the hooks system
* The open source community

<!-- MARKDOWN LINKS & IMAGES -->
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/