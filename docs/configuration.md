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
- .git/*, .svn/*, .hg/*, .bzr/*
- .gitignore, .gitattributes, .gitmodules, .gitkeep

**Package Management:**
- package.json, package-lock.json, yarn.lock, pnpm-lock.yaml, shrinkwrap.json
- composer.json, composer.lock, Gemfile, Gemfile.lock
- Cargo.toml, Cargo.lock, go.mod, go.sum
- requirements*.txt, Pipfile, Pipfile.lock, poetry.lock, pyproject.toml
- .npmrc, .yarnrc, .yarnrc.yml

**Dependencies & Build Output:**
- node_modules/*, vendor/*, bower_components/*, jspm_packages/*
- dist/*, build/*, out/*, lib/*, bin/*, target/*
- .next/*, .nuxt/*, .output/*, .svelte-kit/*
- venv/*, env/*, .venv/*, virtualenv/*

**IDE & Editor:**
- .vscode/*, .idea/*, .atom/*, .vim/*
- *.iml, *.ipr, *.iws, *.swp, *.swo, *~
- .project, .classpath, .settings/*

**CI/CD & Deployment:**
- .github/*, .gitlab/*, .circleci/*, .jenkins/*
- .travis.yml, appveyor.yml, azure-pipelines.yml, Jenkinsfile
- .vercel/*, .netlify/*, .firebase/*, .amplify/*
- Dockerfile*, docker-compose*.yml, .dockerignore
- kubernetes/*, k8s/*, helm/*, charts/*

**Configuration Files:**
- All dotfiles (.env*, .prettierrc*, .eslintrc*, .babelrc*, etc.)
- tsconfig*.json, jsconfig*.json, *.config.js, *.config.ts
- Makefile, makefile, GNUmakefile, CMakeLists.txt

**Testing & Coverage:**
- coverage/*, .coverage, htmlcov/*, .nyc_output/*
- __tests__/*, __mocks__/*, __fixtures__/*, __snapshots__/*
- .pytest_cache/*, __pycache__/*, *.py[cod]

**Temporary & System Files:**
- *.log, logs/*, tmp/*, temp/*, .tmp/*, .temp/*, .cache/*
- .DS_Store, Thumbs.db, desktop.ini, .Trash-*, .nfs*

**Security & Binary Files:**
- *.pem, *.key, *.cert, *.crt, *.p12, *.pfx
- *.exe, *.dll, *.so, *.dylib, *.class, *.jar
- *.zip, *.tar, *.gz, *.7z, *.dmg, *.iso

**Monorepo & Workspace:**
- lerna.json, nx.json, turbo.json, pnpm-workspace.yaml
- packages/*, apps/*, libs/*, .changeset/*

**Database & Migrations:**
- *.db, *.sqlite, *.sqlite3, migrations/*, seeds/*

**Documentation Systems:**
- _site/*, .docusaurus/*, .vuepress/*, .jekyll-cache/*

**Other Important Files:**
- CNAME, robots.txt, sitemap.xml, .well-known/*
- All lock files (*.lock)
- Claude-specific: .claude/*, claude.json, .claude.json

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