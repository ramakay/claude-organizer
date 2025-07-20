What started as a personal project and a set of tools for myself after burning tokens via API and time with the claude max plan, turned into some structured thinking (rare for me)

## The Problems:

1. You ask Claude "fix tests" → Claude ignores your CLAUDE.md rules
2. Claude creates files → Your project root becomes a junkyard

## The Solution: claude-organize

**PRE-execution: /enhance command**  
Transforms vague requests into comprehensive prompts WITH your CLAUDE.md rules included. Note: I don't dump claude.md into your prompt - this instructs it to pick relevant files for the task.

Example: `/enhance fix the broken tests`

Claude receives:

- Expanded requirements (using Claude's own prompt engineering)
- YOUR project rules from CLAUDE.md (contextually selected)
- Clear success criteria

Works best in plan mode (Shift+P) so you can review what rules it selected. Works without plan mode too but you miss seeing the enhancement magic.

**POST-execution: Auto-organization**  
After Claude creates files, they're automatically moved to proper directories. Test files → scripts/testing/, docs → docs/analysis/. AI reads content to categorize correctly.

**Real-world usage:**  
Using this in production on multiple projects. Night and day difference. Pro tip: Ask Claude "what CLAUDE.md rules did you include?" after using /enhance - it actually knows your guidelines now.

**Need testers!**  
First-time npm publisher here. Looking for constructive feedback.

    npm install -g claude-organize

GitHub: https://github.com/ramakay/claude-organizer

**Test safely:** Start with a test project. The tool NEVER deletes files - only moves them. Everything preserved, just organized.

**Looking for feedback on:**

- /enhance effectiveness in different scenarios
- File organization edge cases
- Ideas for improvement
- Any bugs or workflow disruptions

Saw the strict template approach posted here - valid but different philosophy. This enhances your input and cleans the output without changing how you work.
