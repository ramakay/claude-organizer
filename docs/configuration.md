# Configuration Guide

## Environment Variables

Create a `.env` file in your project root:

```bash
# Custom log location (default: ./docs/organization-log.json)
CLAUDE_ORGANIZE_LOG_PATH=/custom/path/organization-log.json

# Enable debug logging
CLAUDE_ORGANIZE_DEBUG=true

# Custom base directory for organization (default: current directory)
CLAUDE_ORGANIZE_BASE_DIR=/custom/base/path

# Bypass organization completely
CLAUDE_ORGANIZE_BYPASS=true

# Skip patterns for files and directories that should never be moved
# Comma-separated list of file/directory patterns to skip
# See "Skip Patterns" section below for defaults and syntax
CLAUDE_ORGANIZE_SKIP_PATTERNS=README.md,LICENSE,*.yml,.claude/*

# Enable JavaScript/MJS file organization (default: false)
# This is OFF by default for safety - only utility scripts are organized
CLAUDE_ORGANIZE_JS=true

# JavaScript organization mode (default: safe)
# safe = only files matching utility patterns (check-*, test-*, debug-*, etc.)
# aggressive = use AI analysis with 95%+ confidence requirement
CLAUDE_ORGANIZE_JS_MODE=safe
```

## Hook Configuration

### Project-Specific Settings

Create `.claude/settings.json` in your project:

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

### Global Settings

Add to `~/.claude/settings.json` for global configuration:

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

## Categories

Claude Organize categorizes files into these directories:

### Markdown Files → `docs/`

- `docs/testing/` - Test results, QA reports, validation outputs
- `docs/analysis/` - Data analysis, performance reports, investigations
- `docs/architecture/` - System design, technical architecture, patterns
- `docs/operations/` - Deployment guides, runbooks, operational docs
- `docs/development/` - Implementation details, code documentation
- `docs/planning/` - Project plans, roadmaps, specifications
- `docs/troubleshooting/` - Debug logs, issue investigations, fixes
- `docs/general/` - Miscellaneous documentation

### Shell Scripts → `scripts/`

- `scripts/` - All `.sh` files (build scripts, deployment scripts, etc.)

### JavaScript/MJS Utility Scripts → `scripts/`

**⚠️ Experimental Feature - OFF by default**

When `CLAUDE_ORGANIZE_JS=true` is set, Claude Organize can organize JavaScript utility scripts:

- `scripts/` - Utility scripts like `check-*.js`, `test-*.js`, `debug-*.js`, etc.
- **NEVER organizes**: Core application code, modules with exports, framework files
- **Ultra-careful analysis**: Multiple safety checks before moving any JS file

Safe utility patterns (organized in `safe` mode):

- `check-*.{js,mjs}` - Configuration checkers
- `test-*.{js,mjs}` - Test data generators
- `debug-*.{js,mjs}` - Debugging utilities
- `analyze-*.{js,mjs}` - Analysis scripts
- `validate-*.{js,mjs}` - Validation tools
- `cleanup-*.{js,mjs}` - Cleanup utilities
- `fix-*.{js,mjs}` - Fix scripts
- `migrate-*.{js,mjs}` - Migration scripts
- `seed-*.{js,mjs}` - Database seeders

## Bypass Mechanism

### Complete Bypass

To disable organization entirely for a project:

```bash
export CLAUDE_ORGANIZE_BYPASS=true
```

This is useful for:

- Projects with existing organization systems
- Temporary disable during development
- Testing without file movement

### Skip Patterns

To skip specific files and directories while keeping organization active:

```bash
# Skip specific files
export CLAUDE_ORGANIZE_SKIP_PATTERNS="README.md,LICENSE,CONTRIBUTING.md"

# Skip all files in .claude directory
export CLAUDE_ORGANIZE_SKIP_PATTERNS=".claude/*"

# Skip multiple patterns
export CLAUDE_ORGANIZE_SKIP_PATTERNS="*.yml,*.yaml,.git/*,node_modules/*"

# Override all defaults with custom patterns
export CLAUDE_ORGANIZE_SKIP_PATTERNS="my-file.md,my-dir/*"
```

Supported patterns:

- **Exact matches**: `README.md`, `LICENSE`
- **Wildcard patterns**: `*.yml`, `test-*.md`
- **Directory patterns**: `.claude/*`, `node_modules/*`
- **Multiple patterns**: Comma-separated list

Default skip patterns include:

**Root Documentation Files:**

- README*, LICENSE*, CONTRIBUTING*, CODE_OF_CONDUCT*, CHANGELOG*, SECURITY*
- AUTHORS*, CONTRIBUTORS*, NOTICE*, PATENTS*, NEWS*, THANKS*, TODO*, ROADMAP*
- CLAUDE.md, CLAUDE.MD

**Version Control:**

- .git/_, .svn/_, .hg/_, .bzr/_
- .gitignore, .gitattributes, .gitmodules, .gitkeep

**Package Management:**

- package.json, package-lock.json, yarn.lock, pnpm-lock.yaml, shrinkwrap.json
- composer.json, composer.lock, Gemfile, Gemfile.lock
- Cargo.toml, Cargo.lock, go.mod, go.sum
- requirements\*.txt, Pipfile, Pipfile.lock, poetry.lock, pyproject.toml
- .npmrc, .yarnrc, .yarnrc.yml

**Dependencies & Build Output:**

- node*modules/*, vendor/_, bower_components/_, jspm*packages/*
- dist/_, build/_, out/_, lib/_, bin/_, target/_
- .next/_, .nuxt/_, .output/_, .svelte-kit/_
- venv/_, env/_, .venv/_, virtualenv/_

**IDE & Editor:**

- .vscode/_, .idea/_, .atom/_, .vim/_
- _.iml, _.ipr, _.iws, _.swp, _.swo, _~
- .project, .classpath, .settings/\*

**CI/CD & Deployment:**

- .github/_, .gitlab/_, .circleci/_, .jenkins/_
- .travis.yml, appveyor.yml, azure-pipelines.yml, Jenkinsfile
- .vercel/_, .netlify/_, .firebase/_, .amplify/_
- Dockerfile*, docker-compose*.yml, .dockerignore
- kubernetes/_, k8s/_, helm/_, charts/_

**Configuration Files:**

- All dotfiles (.env*, .prettierrc*, .eslintrc*, .babelrc*, etc.)
- tsconfig*.json, jsconfig*.json, _.config.js, _.config.ts
- Makefile, makefile, GNUmakefile, CMakeLists.txt

**Testing & Coverage:**

- coverage/_, .coverage, htmlcov/_, .nyc_output/\*
- **tests**/_, **mocks**/_, **fixtures**/_, **snapshots**/_
- .pytest*cache/*, **pycache**/\_, \*.py[cod]

**Temporary & System Files:**

- _.log, logs/_, tmp/_, temp/_, .tmp/_, .temp/_, .cache/\*
- .DS*Store, Thumbs.db, desktop.ini, .Trash-*, .nfs\_

**Security & Binary Files:**

- _.pem, _.key, _.cert, _.crt, _.p12, _.pfx
- _.exe, _.dll, _.so, _.dylib, _.class, _.jar
- _.zip, _.tar, _.gz, _.7z, _.dmg, _.iso

**Monorepo & Workspace:**

- lerna.json, nx.json, turbo.json, pnpm-workspace.yaml
- packages/_, apps/_, libs/_, .changeset/_

**Database & Migrations:**

- _.db, _.sqlite, _.sqlite3, migrations/_, seeds/\*

**Documentation Systems:**

- \_site/_, .docusaurus/_, .vuepress/_, .jekyll-cache/_

**Other Important Files:**

- CNAME, robots.txt, sitemap.xml, .well-known/\*
- All lock files (\*.lock)
- Claude-specific: .claude/\*, claude.json, .claude.json

The organizer automatically skips:

- Files inside directories that match skip patterns (e.g., any file in .claude/)
- Files that match wildcard patterns (e.g., all .log files)
- Files already in the docs/ directory (to prevent loops)

## Customization

### Custom Log Path

```bash
export CLAUDE_ORGANIZE_LOG_PATH="/my/custom/log/path.json"
```

### Debug Mode

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

### Custom Base Directory

```bash
export CLAUDE_ORGANIZE_BASE_DIR="/my/project/root"
```

## Advanced Configuration

### Excluding Files

Files already in organized directories are automatically skipped to prevent loops.

### Performance Tuning

- Claude AI timeout: 30 seconds (not configurable)
- Fallback to keyword analysis is automatic
- File processing is sequential for safety

## Troubleshooting Configuration

### Verify Hook Setup

```bash
# Check if claude-organize is in PATH
which claude-organize

# Test manual execution
echo '{"session_id":"test","transcript_path":"/tmp/test","hook_event_name":"PostToolUse","tool_name":"Write","tool_input":{"file_path":"./test.md","content":"# Test"}}' | claude-organize
```

### Debug Mode

Enable debug logging to see detailed processing:

```bash
CLAUDE_ORGANIZE_DEBUG=true claude-organize
```

### Check Organization Log

```bash
cat docs/organization-log.json
```

## Best Practices

1. **Use project-specific settings** for team consistency
2. **Enable debug mode** during initial setup
3. **Monitor organization logs** for accuracy
4. **Test with sample files** before full deployment
5. **Keep logs in version control** for transparency
