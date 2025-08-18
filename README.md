[![MSeeP.ai Security Assessment Badge](https://mseep.net/pr/ramakay-claude-organizer-badge.png)](https://mseep.ai/app/ramakay-claude-organizer)

# Claude Organize

<div align="center">

<h3>Intelligent document organization for Claude Code</h3>

[![npm version](https://badge.fury.io/js/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![npm downloads](https://img.shields.io/npm/dm/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml)

**NPM Package**: [https://www.npmjs.com/package/claude-organize](https://www.npmjs.com/package/claude-organize)

</div>

## The Messy File Problem 🗂️

Claude Code creates files everywhere. Despite CLAUDE.md instructions saying "don't create scripts in the root directory," it keeps creating test files, debug scripts, and documentation right at your project root:

```
my-project/
├── test-api-v1.md               # First attempt
├── test-api-v2.md               # "Fixed" version
├── test-api-final.md            # "Final" version
├── test-api-final-FIXED.md      # Actually final?
├── debug-webhook.mjs            # Quick test script
├── analyze-performance.mjs      # Debugging session
└── ... (87 more files at root!)
```

**Solution**: Automatic file organization using AI-powered categorization

## How Claude Organize Helps

### 🗂️ Automatic File Organization

```
my-project/
├── src/                         # Source code stays untouched
├── docs/
│   ├── testing/                 # Test results organized
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

### Setup File Organization

You have two options to configure the file organization hook:

#### Option 1: Using Claude's /hooks command (Recommended)

Use Claude Code's built-in /hooks command to configure:

```bash
# Step 1: Type the /hooks command
/hooks

# Step 2: Select "PostToolUse" from the menu

# Step 3: Enter the matcher pattern:
Write|Edit|MultiEdit

# Step 4: Select "command" as the hook type

# Step 5: Enter the command:
claude-organize

# Step 6: Press Enter to confirm

# Step 7: Press Esc twice to exit the menu

# That's it! The hook is now configured
```

#### Option 2: Manual Configuration

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

## How This Complements Claude Code Best Practices

According to [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices), the recommended approaches include:

- **Hierarchical CLAUDE.md files** - Great for static organization in monorepos
- **Shorter sessions with /clear** - Helps manage context effectively
- **Using subagents** - Reduces context usage for complex tasks

**Claude Organize complements these practices:**

**File Organization (Hooks)** - Works regardless of session length. Even with `/clear` and perfect CLAUDE.md setup, Claude still creates files in root. Our hooks ensure consistent organization.

Think of it this way:

- **Best Practices**: Organize your kitchen (hierarchical CLAUDE.md)
- **Claude Organize**: Clean as you cook (hooks)

Both approaches work together for optimal Claude Code workflows.

## Key Features

✅ **Automatic cleanup** - Files move to proper directories instantly  
✅ **AI categorization** - Understands file purpose from content  
✅ **10 script subcategories** - Detailed organization for scripts  
✅ **Safe defaults** - Protects README, LICENSE, configs  
✅ **Context reduction** - Cleaner workspace = better Claude performance

## Architecture

### How It Works

![Architecture Overview](docs/architecture/architecture.png)

**File Organization**: User → Claude Code → Hook → claude-organize → AI → Organized Files

[View all architecture diagrams →](docs/architecture/)

## Documentation

| **Guide**                                                   | **Description**                          |
| ----------------------------------------------------------- | ---------------------------------------- |
| 📖 [Full Documentation](docs/)                              | Complete feature guide and API reference |
| 🚀 [Quick Start](docs/quick-start.md)                       | Get up and running in 5 minutes          |
| 📂 [Subcategories Guide](docs/subcategories.md)             | Script organization patterns             |
| ⚙️ [Configuration](docs/configuration.md)                   | Customize behavior and settings          |
| 🔧 [JavaScript Organization](docs/js-organization-guide.md) | Experimental JS/MJS features             |
| 🛠️ [Troubleshooting](docs/troubleshooting/)                 | Common issues and solutions              |

## Categories

Files are automatically organized into these directories:

### Documentation

- `docs/testing/` - Test results, QA reports
- `docs/analysis/` - Data analysis, performance reports
- `docs/architecture/` - System design, technical docs
- `docs/operations/` - Deployment guides, runbooks
- `docs/troubleshooting/` - Debug logs, issue investigations

### Scripts

- `scripts/checks/` - Verification and validation utilities
- `scripts/testing/` - Test scripts and runners
- `scripts/deployment/` - Deployment and release scripts
- `scripts/utilities/` - General utility scripts
- [+ 6 more subcategories](docs/subcategories.md)

## Common Scenarios

### The "Create and Run" Learning Curve

![Learning Curve](docs/assets/images/learning-curve.jpeg)

You might encounter this scenario:

```
Claude: "I'll create test-email.mjs and run it"
*Creates file*
*File gets organized to scripts/testing/*
Claude: "Error: Cannot find module './test-email.mjs'"
```

**This is intentional!** The friction teaches Claude (and us) better habits:

1. **First time**: Claude learns files don't stay at root
2. **Second time**: Claude checks where files went (`find . -name "test-email.mjs"`)
3. **Third time**: Claude runs directly from organized location

Just like training a junior developer: "Test files go in the test directory."

### Why This Matters

The housekeeper doesn't compromise on cleanliness. This "friction" is actually a feature:

- Claude learns project structure through experience
- Better long-term habits > short-term convenience
- Consistent organization > temporary files at root

## Slash Commands

- `/claude-organize-bypass` - Toggle file organization on/off
- `/claude-organize-add <pattern>` - Add patterns to be organized
- `/claude-organize-js` - Enable JavaScript organization (experimental)

## Safety & Disclaimers

**⚠️ USE AT YOUR OWN RISK**: Claude Organize moves files in your project. Always use version control and test in a safe environment first.

- ✅ **Use version control** (Git) before enabling
- ✅ **Test in a safe environment** first
- ✅ **Review the organization log** at `docs/organization-log.json`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Related Projects

- **[cc-enhance](https://github.com/ramakay/cc-enhance)** - Prompt enhancement with contrarian analysis for Claude Code
  - Transform vague requests into comprehensive, context-aware prompts
  - Adds contrarian analysis to challenge assumptions early
  - Use both tools together for the complete Claude Code experience!

## Support

- 📝 [Report Issues](https://github.com/ramakay/claude-organize/issues)
- 💬 [Discussions](https://github.com/ramakay/claude-organize/discussions)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/ramakay">Rama Annaswamy</a>
</div>
