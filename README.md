# Claude Organize

<div align="center">

<h3>Intelligent document organization for Claude Code using AI-powered categorization</h3>

[![npm version](https://badge.fury.io/js/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![npm downloads](https://img.shields.io/npm/dm/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml)

</div>

## The Problem

Documentation and scripts quickly overwhelm your workspace. Claude Organize automatically categorizes and organizes your markdown files and scripts as you work, keeping your project structure clean and navigable.

### Before Claude Organize 😱

```
my-project/
├── FIXES-APPLIED.md              # Important but lost in 1000+ files
├── architecture.md               # Key docs buried in mess
├── check-api-config.mjs
├── debug-execution.mjs
├── DEPLOYMENT-CHECKLIST.md       # Critical but hard to find
├── ... (1,070+ more files!)
```

### After Claude Organize 🎉

```
my-project/
├── src/                         # Source code stays untouched
├── docs/
│   ├── architecture/architecture.md
│   ├── operations/DEPLOYMENT-CHECKLIST.md
│   └── troubleshooting/FIXES-APPLIED.md
└── scripts/
    ├── checks/check-api-config.mjs
    └── debug/debug-execution.mjs
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

✅ **AI-Powered Categorization** - Understands content, not just filenames  
✅ **Intelligent Script Subcategories** - 10 purpose-based subcategories  
✅ **Enhanced Documentation Command** - `/enhance` using Claude's best practices  
✅ **Safe Defaults** - Protects important files like README, LICENSE, configs  
✅ **Experimental JavaScript Organization** - Ultra-careful safety validation  
✅ **Fully Configurable** - Customize categories and skip patterns

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

## Slash Commands

When using Claude Code, you have access to these commands:

- `/claude-organize-bypass` - Toggle organization on/off
- `/claude-organize-add <pattern>` - Add patterns to be organized
- `/claude-organize-js` - Enable JavaScript organization (experimental)
- `/enhance` - Generate enhanced documentation using Claude's best practices

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
