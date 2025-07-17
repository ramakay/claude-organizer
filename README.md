# Claude Organize

<div align="center">

<h3>Intelligent document organization for Claude Code using AI-powered categorization</h3>

[![npm version](https://badge.fury.io/js/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![npm downloads](https://img.shields.io/npm/dm/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml)

</div>

## The Problem

Claude Code has a file organization problem. Despite CLAUDE.md instructions saying "don't create scripts in the root directory," it keeps creating test files, debug scripts, and documentation right at your project root. Like an eager assistant who doesn't clean up after themselves, Claude Code:

- **Creates duplicate files** with identical names (GitHub Issue #1342)
- **Ignores CLAUDE.md instructions** about file organization (Issue #2901)
- **Accumulates irrelevant files** in its context, degrading performance
- **Requires constant monitoring** to correct its behavior

### Before Claude Organize 😱

```
my-project/
├── test-api-v1.md               # First attempt
├── test-api-v2.md               # "Fixed" version
├── test-api-final.md            # "Final" version
├── test-api-final-FIXED.md      # Actually final?
├── debug-webhook.mjs            # Quick test script
├── check-data-flow.js           # Another test
├── analyze-performance.mjs      # Debugging session
├── TEMP-NOTES.md                # "Temporary" for 3 months
├── src/                         # Your actual code
└── ... (87 more files at root!)
```

### After Claude Organize 🎉

```
my-project/
├── src/                         # Source code stays untouched
├── docs/
│   ├── testing/                 # All test results organized
│   └── troubleshooting/         # Debug notes in one place
└── scripts/
    ├── checks/                  # Validation scripts grouped
    └── debug/                   # Debug utilities together
```

## Quick Start

### Installation

```bash
npm install -g claude-organize
```

### Setup with Claude Code

Add to your `.claude/settings.json`:

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

### Basic Usage

Files are automatically organized when you create or edit them with Claude Code:

- `debug-api.md` → `docs/troubleshooting/debug-api.md`
- `check-status.mjs` → `scripts/checks/check-status.mjs`
- `deployment-guide.md` → `docs/operations/deployment-guide.md`

## Key Features

✅ **Works Around Claude Code** - Automatically fixes the mess after creation  
✅ **Intelligent Script Subcategories** - 10 purpose-based subcategories  
✅ **Post-creation Cleanup** - Moves files where they should have been created  
✅ **Safe Defaults** - Protects important files like README, LICENSE, configs  
✅ **Experimental JavaScript Organization** - Ultra-careful safety validation  
✅ **Reduces Context Clutter** - Organized files = cleaner Claude Code context

## Documentation

| **Guide**                                                   | **Description**                          |
| ----------------------------------------------------------- | ---------------------------------------- |
| 📖 [Full Documentation](docs/)                              | Complete feature guide and API reference |
| 🚀 [Quick Start](docs/quick-start.md)                       | Get up and running in 5 minutes          |
| 📂 [Subcategories Guide](docs/subcategories.md)             | Script organization patterns             |
| ⚙️ [Configuration](docs/configuration.md)                   | Customize behavior and settings          |
| 🔧 [JavaScript Organization](docs/js-organization-guide.md) | Experimental JS/MJS features             |
| 🛠️ [Troubleshooting](docs/troubleshooting/)                 | Common issues and solutions              |
| 🤝 [Contributing](CONTRIBUTING.md)                          | How to contribute to the project         |

## The `/enhance` Command

Transform vague requests into comprehensive, well-structured prompts using [Claude's best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices). This powerful slash command works directly in Claude Code - no setup required.

### What it does

Takes your brief request and transforms it into a detailed specification with:

- Clear objectives and requirements
- Explicit success criteria
- Structured format with context
- Edge cases and constraints

### How it works

The `/enhance` command transforms minimal input into comprehensive prompts:

```bash
# Transform vague requests into detailed specifications
/enhance Fix the broken authentication → Detailed auth debugging plan
/enhance Create API docs → Comprehensive documentation structure
/enhance Make it faster → Performance optimization requirements
```

### Real transformations

**Input**: `/enhance fix the broken thing`  
**Output**: Detailed debugging plan with:

- Problem identification steps
- Root cause analysis approach
- Testing methodology
- Success criteria

**Input**: `/enhance write tests`  
**Output**: Comprehensive test plan including:

- Test coverage requirements
- Edge cases to consider
- Framework recommendations
- Quality metrics

All enhanced prompts follow Claude 4 best practices for clarity, structure, and actionable output. Works in both normal and plan modes.

## Other Slash Commands

When using Claude Code, you also have access to:

- `/claude-organize-bypass` - Toggle organization on/off
- `/claude-organize-add <pattern>` - Add patterns to be organized
- `/claude-organize-js` - Enable JavaScript organization (experimental)

## Categories

Files are automatically organized into these directories:

### Documentation

- `docs/testing/` - Test results, QA reports
- `docs/analysis/` - Data analysis, performance reports
- `docs/architecture/` - System design, technical docs
- `docs/operations/` - Deployment guides, runbooks
- `docs/development/` - Implementation details
- `docs/troubleshooting/` - Debug logs, issue investigations

### Scripts (with intelligent subcategories)

- `scripts/checks/` - Verification and validation utilities
- `scripts/testing/` - Test scripts and runners
- `scripts/fixes/` - Scripts that fix or repair issues
- `scripts/deployment/` - Deployment and release scripts
- `scripts/utilities/` - General utility scripts
- [+ 5 more subcategories](docs/subcategories.md)

## Safety & Disclaimers

**⚠️ USE AT YOUR OWN RISK**: Claude Organize moves files in your project. Always use version control and test in a safe environment first.

- ✅ **Use version control** (Git) before enabling
- ✅ **Test in a safe environment** first
- ✅ **Review the organization log** at `docs/organization-log.json`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Support

- 📝 [Report Issues](https://github.com/ramakay/claude-organize/issues)
- 💬 [Discussions](https://github.com/ramakay/claude-organize/discussions)
- 📧 [Contact](mailto:your-email@example.com)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/ramakay">Rama Annaswamy</a>
</div>
