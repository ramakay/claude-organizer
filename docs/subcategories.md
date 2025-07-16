# Subcategory System Guide

## Overview

Claude Organize v0.3.0 introduces intelligent subcategory organization for scripts, providing fine-grained organization based on the script's purpose and functionality. This system combines pattern matching with AI analysis to ensure scripts are placed in the most appropriate location.

## How It Works

The subcategory system operates in two phases:

1. **Pattern Analysis**: Filename patterns are matched against predefined subcategory patterns
2. **AI Analysis**: If patterns are ambiguous, Claude AI analyzes the script content to determine the best subcategory

## Subcategory Structure

### `scripts/activation/`

**Purpose**: Scripts that activate, trigger, or enable features

**Patterns**:

- `activate-*` - Scripts that activate services or features
- `trigger-*` - Scripts that trigger workflows or processes
- `enable-*` - Scripts that enable functionality
- `start-*` - Scripts that start services
- `launch-*` - Scripts that launch applications

**Keywords**: activate, trigger, enable, start, launch, initiate, orchestrate

**Examples**:

- `activate-workflow.mjs` → `scripts/activation/`
- `trigger-deployment.js` → `scripts/activation/`
- `start-services.sh` → `scripts/activation/`

### `scripts/checks/`

**Purpose**: Verification, validation, and status checking utilities

**Patterns**:

- `check-*` - Scripts that check system status
- `verify-*` - Scripts that verify configurations
- `validate-*` - Scripts that validate data
- `inspect-*` - Scripts that inspect system state
- `monitor-*` - Scripts that monitor systems

**Keywords**: check, verify, validate, status, health, inspect, audit, monitor

**Examples**:

- `check-api-status.mjs` → `scripts/checks/`
- `verify-database.js` → `scripts/checks/`
- `validate-config.sh` → `scripts/checks/`

### `scripts/testing/`

**Purpose**: Test scripts and test runners

**Patterns**:

- `test-*` - Test scripts
- `*-test.*` - Test files
- `*.test.*` - Test files
- `spec-*` - Specification tests
- `*.spec.*` - Specification files

**Keywords**: test, spec, jest, mocha, vitest, e2e, integration, unit

**Examples**:

- `test-api.mjs` → `scripts/testing/`
- `user-service.test.js` → `scripts/testing/`
- `integration.spec.ts` → `scripts/testing/`

### `scripts/fixes/`

**Purpose**: Scripts that fix, repair, or patch issues

**Patterns**:

- `fix-*` - Scripts that fix issues
- `repair-*` - Scripts that repair problems
- `patch-*` - Scripts that patch bugs
- `resolve-*` - Scripts that resolve conflicts
- `correct-*` - Scripts that correct errors

**Keywords**: fix, repair, patch, resolve, correct, mend, remedy

**Examples**:

- `fix-database-issue.mjs` → `scripts/fixes/`
- `repair-config.js` → `scripts/fixes/`
- `patch-security-flaw.sh` → `scripts/fixes/`

### `scripts/database/`

**Purpose**: Database operations, migrations, and backups

**Patterns**:

- `migrate-*` - Database migrations
- `backup-*` - Database backups
- `*-db.*` - Database-related scripts
- `seed-*` - Database seeding
- `restore-*` - Database restoration

**Keywords**: database, migrate, migration, prisma, backup, sql, postgres, sqlite, seed

**Examples**:

- `migrate-users.mjs` → `scripts/database/`
- `backup-production.js` → `scripts/database/`
- `seed-test-data.sh` → `scripts/database/`

### `scripts/debug/`

**Purpose**: Debug and diagnostic utilities

**Patterns**:

- `debug-*` - Debug scripts
- `diagnose-*` - Diagnostic scripts
- `trace-*` - Tracing scripts
- `analyze-*` - Analysis scripts
- `investigate-*` - Investigation scripts

**Keywords**: debug, diagnose, trace, inspect, analyze, investigate, troubleshoot

**Examples**:

- `debug-performance.mjs` → `scripts/debug/`
- `diagnose-memory-leak.js` → `scripts/debug/`
- `trace-execution.sh` → `scripts/debug/`

### `scripts/deployment/`

**Purpose**: Deployment and release scripts

**Patterns**:

- `deploy-*` - Deployment scripts
- `release-*` - Release scripts
- `publish-*` - Publishing scripts
- `rollout-*` - Rollout scripts
- `ship-*` - Shipping scripts

**Keywords**: deploy, release, publish, production, rollout, ship, launch

**Examples**:

- `deploy-to-production.mjs` → `scripts/deployment/`
- `release-version.js` → `scripts/deployment/`
- `publish-package.sh` → `scripts/deployment/`

### `scripts/setup/`

**Purpose**: Setup, configuration, and installation scripts

**Patterns**:

- `setup-*` - Setup scripts
- `configure-*` - Configuration scripts
- `install-*` - Installation scripts
- `init-*` - Initialization scripts
- `bootstrap-*` - Bootstrap scripts

**Keywords**: setup, configure, install, init, bootstrap, provision

**Examples**:

- `setup-development.mjs` → `scripts/setup/`
- `configure-environment.js` → `scripts/setup/`
- `install-dependencies.sh` → `scripts/setup/`

### `scripts/workflows/`

**Purpose**: Workflow and process management scripts

**Patterns**:

- `workflow-*` - Workflow scripts
- `process-*` - Process management scripts
- `orchestrat-*` - Orchestration scripts
- `*-workflow.*` - Workflow-related scripts

**Keywords**: workflow, process, orchestrate, pipeline, automation

**Examples**:

- `workflow-manager.mjs` → `scripts/workflows/`
- `process-orders.js` → `scripts/workflows/`
- `orchestrate-deployment.sh` → `scripts/workflows/`

### `scripts/utilities/`

**Purpose**: General utility and helper scripts

**Patterns**:

- `get-*` - Scripts that retrieve data
- `list-*` - Scripts that list items
- `find-*` - Scripts that find resources
- `show-*` - Scripts that display information
- `update-*` - Scripts that update resources
- `batch-*` - Batch processing scripts

**Keywords**: get, list, find, show, update, batch, utility, helper

**Examples**:

- `get-user-info.mjs` → `scripts/utilities/`
- `list-services.js` → `scripts/utilities/`
- `batch-process.sh` → `scripts/utilities/`

## Configuration

The subcategory system is automatically enabled for all script files. You can customize the behavior through environment variables:

```bash
# Enable debug mode to see subcategory decisions
CLAUDE_ORGANIZE_DEBUG=true

# Disable subcategory organization (use main scripts/ directory only)
CLAUDE_ORGANIZE_DISABLE_SUBCATEGORIES=true
```

## Pattern Matching vs AI Analysis

### Pattern Matching (Fast)

- Uses filename patterns to quickly categorize obvious cases
- Handles 90% of common script naming conventions
- Instant categorization without AI API calls

### AI Analysis (Intelligent)

- Used when patterns are ambiguous or unclear
- Analyzes script content, comments, and structure
- Provides reasoning for categorization decisions

## Troubleshooting

### Common Issues

1. **Script placed in wrong subcategory**
   - Check if filename matches multiple patterns
   - Review AI reasoning in organization log
   - Consider renaming script to match intended pattern

2. **Scripts not being subcategorized**
   - Ensure `CLAUDE_ORGANIZE_DISABLE_SUBCATEGORIES` is not set
   - Check if JavaScript organization is enabled for .js/.mjs files
   - Verify script is not in skip patterns

3. **AI analysis taking too long**
   - Use clearer filename patterns for faster categorization
   - Consider pattern-based organization for bulk operations

### Debug Mode

Enable debug mode to see detailed subcategory decisions:

```bash
export CLAUDE_ORGANIZE_DEBUG=true
```

This will show:

- Which patterns were matched
- AI analysis reasoning (if used)
- Final subcategory decision
- Why certain subcategories were rejected

## Best Practices

### Naming Conventions

1. **Use descriptive prefixes**: `check-api-health.mjs` instead of `health.mjs`
2. **Follow patterns**: Use established patterns like `test-*`, `fix-*`, `deploy-*`
3. **Be specific**: `debug-memory-leak.js` instead of `debug.js`
4. **Avoid ambiguity**: Don't use names that could match multiple patterns

### Organization Strategy

1. **Start with patterns**: Name scripts to match subcategory patterns
2. **Let AI handle edge cases**: For complex or multi-purpose scripts
3. **Review organization log**: Check that scripts are categorized correctly
4. **Adjust patterns**: Rename scripts if they're consistently miscategorized

### Performance Optimization

1. **Use pattern matching**: Faster than AI analysis
2. **Batch operations**: Process multiple scripts at once
3. **Clear naming**: Reduces need for AI analysis
4. **Regular cleanup**: Remove temporary test files

## Migration from v0.2.x

Scripts in the root `scripts/` directory will be automatically reorganized into subcategories when:

1. They are edited or modified
2. You run manual organization
3. They match subcategory patterns

**Note**: Existing scripts are not automatically moved to preserve your current organization. Only newly created or edited scripts will be subcategorized.

## Examples

### Before Subcategories (v0.2.x)

```
scripts/
├── check-api.mjs
├── test-auth.js
├── fix-database.mjs
├── deploy-prod.sh
├── debug-memory.js
└── activate-service.mjs
```

### After Subcategories (v0.3.0)

```
scripts/
├── activation/
│   └── activate-service.mjs
├── checks/
│   └── check-api.mjs
├── testing/
│   └── test-auth.js
├── fixes/
│   └── fix-database.mjs
├── deployment/
│   └── deploy-prod.sh
└── debug/
    └── debug-memory.js
```

This organization makes it much easier to find and manage scripts based on their purpose and functionality.
