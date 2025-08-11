# Claude Organize

<div align="center">

<h3>Intelligent document organization & prompt enhancement for Claude Code</h3>

[![npm version](https://badge.fury.io/js/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![npm downloads](https://img.shields.io/npm/dm/claude-organize.svg)](https://www.npmjs.com/package/claude-organize)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/ramakay/claude-organizer/actions/workflows/ci.yml)

**NPM Package**: [https://www.npmjs.com/package/claude-organize](https://www.npmjs.com/package/claude-organize)

</div>

## Two Problems, One Solution

Claude Organize solves two critical problems when working with Claude Code:

### Problem 1: The Messy File Problem 🗂️

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

### Problem 2: The Context Adherence Problem 🧠

Claude Code struggles to maintain project context throughout conversations. You have a detailed CLAUDE.md with project rules, but Claude often:

- **Forgets project guidelines** mid-conversation
- **Ignores file organization rules** when creating new files
- **Loses track of coding standards** over time
- **Requires constant reminders** about project conventions

**Example**: You ask "fix the broken tests" and Claude doesn't remember your rule: "NEVER claim success if tests are failing"

**Solution**: The `/enhance` command transforms vague requests into comprehensive, context-aware prompts

#### Before and After

**Before** (what you type):

```
fix the broken tests
```

**After** `/enhance` (what Claude receives):

```
Enhanced Prompt: Fix the Broken Tests

DETECTED TASK TYPE:
Primary intent: Debugging
Relevant contexts: testing, code-quality

CONTEXT & MOTIVATION:
Tests are failing and need immediate attention. Broken tests block deployments
and reduce confidence in the codebase. Each test failure needs systematic
investigation to find root causes, not just symptom fixes.

CONTRARIAN ANALYSIS:
- Are tests failing due to code bugs or test environment issues?
- Could recent dependency updates have broken tests?
- Are the tests themselves flawed rather than the code?
- Should we fix or remove outdated tests?

PROJECT RULES (from CLAUDE.md):
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
- Document changes appropriately

REQUIREMENTS:
- Run full test suite to see current state
- Analyze each failure for root cause
- Fix underlying issues, not just symptoms
- Verify no regression in other tests
- Run lint and typecheck after changes

SUCCESS CRITERIA:
- [ ] All tests pass without warnings
- [ ] Root causes documented
- [ ] No regression in existing tests
- [ ] Lint and typecheck pass
```

**💡 Pro Tip**: Use Shift+P (plan mode) with `/enhance` to review the enhanced prompt before execution

#### How the /enhance Command Works

1. **Reads CLAUDE.md** - Automatically finds and incorporates your project rules
2. **Detects Task Type** - Analyzes keywords to understand what you're trying to do
3. **Adds Contrarian Analysis** - Questions assumptions early to prevent wasted effort
4. **Maps to MCP Tools** - Recommends appropriate tools like mcp**zen**\* for analysis
5. **Generates Structured Prompt** - Creates comprehensive requirements with success criteria
6. **Presents for Review** - Shows the enhanced prompt in plan mode for your approval

The enhance command ensures Claude understands not just what you want, but also your project's specific requirements, potential pitfalls, and success criteria.

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

### 🧠 Smart Context Selection

```bash
# Your vague request
/enhance fix the broken tests

# What happens:
✓ Analyzes your request to understand the task type
✓ Extracts ONLY relevant rules (e.g., testing rules for test tasks)
✓ Creates a comprehensive but concise specification
✓ Adds necessary context without bloating

# Example - from 100-line CLAUDE.md, only extracts:
✓ "NEVER claim success if tests are failing"
✓ "ALWAYS verify functionality before declaring completion"
✓ Ignores unrelated rules about file naming, deployment, etc.
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

### Use the /enhance Command

The `/enhance` command is automatically installed to `~/.claude/commands/` and ready to use:

```bash
/enhance create a deployment guide
# → Comprehensive prompt with relevant CLAUDE.md rules included
```

## How This Complements Claude Code Best Practices

According to [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices), the recommended approaches include:

- **Hierarchical CLAUDE.md files** - Great for static organization in monorepos
- **Shorter sessions with /clear** - Helps manage context effectively
- **Using subagents** - Reduces context usage for complex tasks

**Claude Organize complements these practices:**

1. **File Organization (Hooks)** - Works regardless of session length. Even with `/clear` and perfect CLAUDE.md setup, Claude still creates files in root. Our hooks ensure consistent organization.

2. **The `/enhance` Command** - Bridges the gap between static rules and dynamic application:
   - Hierarchical CLAUDE.md = Foundation (what rules exist)
   - `/enhance` = Application (which rules apply now)
   - Perfect for planning mode where context often gets lost

3. **Just-in-Time Context** - Instead of hoping Claude remembers rules from startup or manually reminding it, `/enhance` surgically injects only the relevant 2-5 rules exactly when needed.

Think of it this way:

- **Best Practices**: Organize your kitchen (hierarchical CLAUDE.md)
- **Claude Organize**: Clean as you cook (hooks) + grab the right tools (enhance)

Both approaches work together for optimal Claude Code workflows.

## Key Features

### File Organization (Hooks)

✅ **Automatic cleanup** - Files move to proper directories instantly  
✅ **AI categorization** - Understands file purpose from content  
✅ **10 script subcategories** - Detailed organization for scripts  
✅ **Safe defaults** - Protects README, LICENSE, configs  
✅ **Context reduction** - Cleaner workspace = better Claude performance

### Prompt Enhancement (/enhance)

✅ **Two-pass enhancement** - First expands using Claude's best practices, then adds CLAUDE.md rules  
✅ **Prompt engineering** - Transforms vague requests into comprehensive specifications  
✅ **Context engineering** - Selects only relevant project rules  
✅ **CLAUDE.md integration** - Automatically includes applicable guidelines  
✅ **Smart detection** - Understands task type from your request  
✅ **Efficient prompts** - No rule dumping, only what's needed  
✅ **Works in plan mode** - Compatible with Claude's planning features

## Architecture

### How It All Works

![Architecture Overview](docs/architecture/architecture.png)

**File Organization**: User → Claude Code → Hook → claude-organize → AI → Organized Files

### The /enhance Command Flow

![Enhance Command](docs/architecture/enhance-command.png)

**Prompt Enhancement**: User → /enhance → Reads CLAUDE.md → Context Analysis → Enhanced Prompt

### Hooks vs Slash Commands

![Hooks vs Commands](docs/architecture/hooks-vs-commands.png)

- **Hooks**: Automatic, background file organization
- **Slash Commands**: Interactive, user-initiated enhancements

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

**Pro tip**: Use `/enhance` to help Claude understand the project structure:

```bash
/enhance create and test email functionality
# The enhanced prompt will:
# - Extract only relevant CLAUDE.md rules (not the entire file)
# - Add necessary context and structure
# - Include project-specific conventions
# - Create a comprehensive but concise plan
```

The `/enhance` command has been optimized to be "comprehensive but concise" - adding only necessary detail instead of arbitrary expansion. It performs surgical context injection, selecting just the 2-5 most relevant rules from your CLAUDE.md instead of dumping everything.

### Why This Matters

The housekeeper doesn't compromise on cleanliness. This "friction" is actually a feature:

- Claude learns project structure through experience
- Better long-term habits > short-term convenience
- Consistent organization > temporary files at root

## Other Slash Commands

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

## Support

- 📝 [Report Issues](https://github.com/ramakay/claude-organize/issues)
- 💬 [Discussions](https://github.com/ramakay/claude-organize/discussions)
- 📧 [Contact](mailto:your-email@example.com)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/ramakay">Rama Annaswamy</a>
</div>
