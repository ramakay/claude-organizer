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

[![npm version](https://badge.fury.io/js/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![npm downloads](https://img.shields.io/npm/dm/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml)
[![Security Policy](https://img.shields.io/badge/Security-Policy-red.svg)](https://github.com/ramakay/claude-organize/blob/main/SECURITY.md)
[![Known Vulnerabilities](https://snyk.io/test/github/ramakay/claude-organizer/badge.svg)](https://snyk.io/test/github/ramakay/claude-organizer)

</div>

## The Problem

When working with Claude Code on complex projects, documentation and scripts can quickly overwhelm your workspace. Without organization, finding specific documentation becomes a nightmare.

### Real-World Example: Before Claude Organize 😱

From an actual automation project with **1,081 files** in the root directory:

- **98 markdown files** mixed with source code
- **504 JavaScript/MJS scripts** scattered everywhere
- Test scripts, debug logs, deployment guides all jumbled together

```
my-project/
├── activate-workflow.mjs
├── check-api-config.mjs
├── FIXES-APPLIED.md              # Important but lost in 1000+ files
├── analyze-execution-failure.mjs
├── architecture.md               # Key docs buried in the mess
├── check-data-flow.mjs
├── create-test-data.js
├── debug-execution.mjs
├── DEPLOYMENT-CHECKLIST.md       # Critical but hard to find
├── fix-webhook-response.mjs
├── temp-analysis-20240715.md    # Temporary files accumulating
├── old-debug-log.md             # Should be cleaned up
├── validate-system.mjs
├── ... (1,070 more files!)
```

Finding anything requires:

- Endless scrolling
- Complex grep/find commands
- Memorizing file names
- Wasting precious development time

### After Claude Organize 🎉

```
my-project/
├── src/                         # Source code stays untouched
├── scripts/
│   ├── deployment/
│   │   ├── activate-workflow.mjs
│   │   └── deploy-production.js
│   ├── testing/
│   │   ├── create-test-data.js
│   │   └── validate-system.mjs
│   └── debugging/
│       ├── check-api-config.mjs
│       └── debug-execution.mjs
└── docs/
    ├── architecture/
    │   └── architecture.md      # Easy to find!
    ├── operations/
    │   └── DEPLOYMENT-CHECKLIST.md
    ├── troubleshooting/
    │   ├── FIXES-APPLIED.md
    │   └── analyze-execution-failure.md
    ├── development/
    │   └── api-integration-guide.md
    └── cleanup/                 # Temporary files clearly marked
        ├── temp-analysis-20240715.md
        └── old-debug-log.md

```

## What Claude Organize Does

✅ **Automatically organizes** markdown docs and scripts as you create them
✅ **AI-powered categorization** understands content, not just filenames
✅ **Smart cleanup detection** - distinguishes temporary files from permanent docs
✅ **Preserves your workflow** - works seamlessly with Claude Code hooks
✅ **Smart defaults** - protects important files like README, LICENSE, configs
✅ **Fully configurable** - customize categories and skip patterns

### Special Features

🧹 **Intelligent Cleanup Category**: Claude Organize can detect temporary files and documents that should be cleaned up later, organizing them into a `docs/cleanup/` folder. This includes:

- Temporary analysis files
- Old debug logs
- Draft documents marked for deletion
- One-off test results

## What It Doesn't Do

❌ **Won't touch source code** - only organizes .md, .sh, and .txt files
❌ **Won't move existing files** automatically - only newly created/edited files
❌ **Won't break your project** - extensive skip patterns for safety
❌ **Won't slow you down** - runs asynchronously after file operations
❌ **Won't delete files** - cleanup folder is for organization, not automatic deletion

## ⚠️ Important Disclaimer

**USE AT YOUR OWN RISK**: Claude Organize moves files in your project. While it has extensive safety measures and skip patterns, you should:

- ✅ **Always use version control** (Git) before enabling
- ✅ **Test in a safe environment** first
- ✅ **Review the organization log** at `docs/organization-log.json`
- ✅ **Keep backups** of important projects

**This tool is provided "as is" without warranty of any kind.** The authors are not responsible for any data loss or project disruption. By using this tool, you accept full responsibility for its effects on your files.

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

- [![TypeScript][TypeScript]][TypeScript-url]
- [![Node.js][Node.js]][Node-url]
- Claude AI API

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
- `/claude-organize-js` - Enable JavaScript/MJS organization (shows warnings)
- `/enhance` - Generate enhanced documentation using Claude's best practices

#### The `/enhance` Command

The `/enhance` command uses [Claude's best practices for prompt documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) to create comprehensive, well-structured documentation for your project. This is particularly useful for:

- **API Documentation** - Auto-generate detailed API docs with examples
- **Code Documentation** - Create comprehensive code documentation
- **Project Guides** - Generate setup, usage, and troubleshooting guides
- **README Enhancement** - Improve existing documentation with best practices

**Usage Examples:**

```bash
/enhance Create comprehensive API documentation for the user management system
/enhance Generate a troubleshooting guide for the payment processing module
/enhance Write setup instructions for the development environment
```

The enhanced documentation will be automatically organized into appropriate categories by Claude Organize.

### Categories & Subcategories

Files are organized into these directories:

#### Documentation Categories

- `docs/testing/` - Test results, QA reports, validation outputs
- `docs/analysis/` - Data analysis, performance reports, investigations
- `docs/architecture/` - System design, technical architecture, patterns
- `docs/operations/` - Deployment guides, runbooks, operational docs
- `docs/development/` - Implementation details, code documentation
- `docs/planning/` - Project plans, roadmaps, specifications
- `docs/troubleshooting/` - Debug logs, issue investigations, fixes
- `docs/cleanup/` - Temporary files marked for deletion
- `docs/general/` - Miscellaneous documentation

#### Script Categories with Intelligent Subcategories

**New in v0.3.0**: Scripts are now organized with intelligent subcategories based on their purpose:

- `scripts/activation/` - Scripts that activate, trigger, or enable features
  - `activate-*`, `trigger-*`, `enable-*`, `start-*`, `launch-*`
- `scripts/checks/` - Verification, validation, and status checking utilities
  - `check-*`, `verify-*`, `validate-*`, `inspect-*`, `monitor-*`
- `scripts/testing/` - Test scripts and test runners
  - `test-*`, `*-test.*`, `*.test.*`, `spec-*`, `*.spec.*`
- `scripts/fixes/` - Scripts that fix, repair, or patch issues
  - `fix-*`, `repair-*`, `patch-*`, `resolve-*`, `correct-*`
- `scripts/database/` - Database operations, migrations, and backups
  - `migrate-*`, `backup-*`, `*-db.*`, `seed-*`, `restore-*`
- `scripts/debug/` - Debug and diagnostic utilities
  - `debug-*`, `diagnose-*`, `trace-*`, `analyze-*`, `investigate-*`
- `scripts/deployment/` - Deployment and release scripts
  - `deploy-*`, `release-*`, `publish-*`, `rollout-*`, `ship-*`
- `scripts/setup/` - Setup, configuration, and installation scripts
  - `setup-*`, `configure-*`, `install-*`, `init-*`, `bootstrap-*`
- `scripts/workflows/` - Workflow and process management scripts
  - `workflow-*`, `process-*`, `orchestrat-*`, `*-workflow.*`
- `scripts/utilities/` - General utility and helper scripts
  - `get-*`, `list-*`, `find-*`, `show-*`, `update-*`, `batch-*`

**Smart Pattern Matching**: Claude Organize uses both filename patterns and AI content analysis to determine the most appropriate subcategory for each script.

## 🚨 Experimental: JavaScript/MJS Organization

**⚠️ DISABLED BY DEFAULT - EXPERIMENTAL FEATURE**

Claude Organize can organize JavaScript utility scripts, but this feature is **OFF by default** due to the risk of breaking your project.

### What It Does

When enabled with `CLAUDE_ORGANIZE_JS=true`, it can organize utility scripts like:

- `check-api-config.mjs` → `scripts/`
- `debug-workflow.js` → `scripts/`
- `test-data-generator.mjs` → `scripts/`

### What It NEVER Touches

- ❌ Any file in `src/`, `lib/`, `dist/`, `build/`
- ❌ Files with `export` or `module.exports`
- ❌ React/Vue/Angular components
- ❌ Config files (`*.config.js`)
- ❌ Package entry points (`index.js`, `main.js`)

### How to Enable (Use with Extreme Caution!)

```bash
# Enable JS organization
export CLAUDE_ORGANIZE_JS=true

# Choose mode:
# safe = only files matching utility patterns (recommended)
export CLAUDE_ORGANIZE_JS_MODE=safe

# aggressive = AI analysis with 95% confidence (riskier)
export CLAUDE_ORGANIZE_JS_MODE=aggressive
```

Or use the slash command: `/claude-organize-js`

### Safety Measures

1. **Multi-layer validation** before moving any JS file
2. **Pattern matching** for known utility scripts
3. **AI analysis** (in aggressive mode) with extreme caution
4. **Size limits** - only small utility scripts
5. **Export detection** - skips any module files

**⚠️ WARNING**: Even with these safety measures, enabling JS organization could potentially move files that break your project. Always use version control and test thoroughly!

## 📊 Monitoring & Logs

Claude Organize maintains a detailed log of all file movements:

**Log Location**: `docs/organization-log.json`

The log contains:

- Timestamp of each operation
- Original file path
- New file path
- Category assigned
- AI confidence score
- Reasoning for the categorization

Example log entry:

```json
{
  "timestamp": "2024-07-15T10:30:45.123Z",
  "originalPath": "./debug-api-config.md",
  "newPath": "./docs/troubleshooting/debug-api-config.md",
  "category": "troubleshooting",
  "score": 85,
  "reasoning": "Claude AI: File contains debugging information and error analysis"
}
```

**Check logs regularly** to:

- Verify files are being organized correctly
- Understand AI decision-making
- Track all file movements
- Troubleshoot any issues

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
- Version control (.git/\*, .gitignore, etc.)
- Package files (package.json, package-lock.json, etc.)
- Build directories (dist/_, build/_, node_modules/\*)
- Configuration files (._rc, _.config.\*, etc.)
- Binary files (_.exe, _.dll, \*.zip, etc.)
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

## Feature Interactions

### Skip Patterns vs JS Safety

When both features are enabled:

1. **Skip patterns take precedence** - If you add `*.js` to `CLAUDE_ORGANIZE_SKIP_PATTERNS`, those files will be skipped entirely
2. **JS safety checks are bypassed** - Skip patterns prevent JS safety analysis from running
3. **User control is respected** - Your skip patterns always win

**Example**:

```bash
# This will prevent ALL .mjs files from being organized
# even if CLAUDE_ORGANIZE_JS=true
export CLAUDE_ORGANIZE_SKIP_PATTERNS="*.mjs,config/*"
```

**⚠️ Warning**: Adding JS files to skip patterns means they bypass all safety checks!

## Known Limitations

### 1. Cross-Project Hook Issues

**Problem**: PostToolUse hooks may not trigger reliably in projects outside claude-organize.

**Symptoms**:

- Files created by Claude aren't organized
- No organization log created
- Hook doesn't receive project's `.env` settings

**Workaround**: Use manual organization (see [JS Organization Guide](docs/js-organization-guide.md))

### 2. Path Safety Check Complexity

**Problem**: Absolute paths from hooks can fail depth validation.

**Debug**:

```bash
CLAUDE_ORGANIZE_DEBUG=true claude-organize < input.json
```

**Workaround**:

```bash
# Bypass path check if needed (use cautiously)
export CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK=true
```

### 3. Environment Variable Loading

**Problem**: Hooks may not load project-specific `.env` files.

**Solution**: Set environment variables globally or use manual workflow.

## Troubleshooting

### Debug Mode

Enable comprehensive logging:

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

This shows:

- Path safety check decisions
- Pattern matching results
- AI analysis reasoning
- Skip pattern matches

### Common Issues

1. **"Not a supported file type"**
   - Update to latest version
   - Check file extension is `.md`, `.sh`, `.js`, or `.mjs`

2. **"Failed validation: Path Safety Check"**
   - Use debug mode to see why
   - Consider bypass flag for testing
   - Ensure file is in a project directory

3. **Files not organizing in external projects**
   - Known limitation with PostToolUse hooks
   - Use manual workflow (see guide)

### Manual Organization

When hooks fail, organize manually:

```bash
# See docs/js-organization-guide.md for complete instructions
echo '{...}' | claude-organize
```

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

- Claude AI for intelligent categorization
- Claude Code team for the hooks system
- The open source community

<!-- MARKDOWN LINKS & IMAGES -->

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
