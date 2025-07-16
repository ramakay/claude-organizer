---
description: Show Claude Organize status and configuration
allowed-tools: Bash
---

Display the current Claude Organize configuration and status.

## Current Status

!`if [ "$CLAUDE_ORGANIZE_BYPASS" = "true" ]; then echo "🔴 Claude Organize is DISABLED (bypassed)"; else echo "🟢 Claude Organize is ENABLED"; fi`

## Configuration

!`echo "Environment Variables:"; env | grep CLAUDE_ORGANIZE | sort`

## Skip Patterns

!`if [ -n "$CLAUDE_ORGANIZE_SKIP_PATTERNS" ]; then echo "Custom skip patterns:"; echo "$CLAUDE_ORGANIZE_SKIP_PATTERNS" | tr ',' '\n' | sed 's/^/  - /'; else echo "Using default skip patterns"; fi`

## Organization Log

!`if [ -f docs/organization-log.json ]; then echo "Recent organizations:"; tail -5 docs/organization-log.json | grep -E '"originalPath"|"newPath"' | tail -10; else echo "No organization log found"; fi`
