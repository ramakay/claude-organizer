---
description: Transform vague requests into well-structured prompts with context-aware CLAUDE.md integration and external tool recommendations
allowed-tools: [exit_plan_mode, Read, Glob, Task]
---

# Enhanced Prompt Engineering with Context Awareness

Transform the following request into a comprehensive, well-structured prompt that follows Claude 4 best practices and incorporates relevant project rules from CLAUDE.md:

**Original Request**: $ARGUMENTS

## CRITICAL INSTRUCTION: ALWAYS GENERATE THE ENHANCED PROMPT FIRST

You MUST follow this two-step process:

1. **ENHANCE**: Generate the complete enhanced prompt using the template below
2. **PRESENT**: Use exit_plan_mode to show the enhanced prompt to the user

NEVER skip directly to analysis or execution. The user wants to see the enhanced prompt structure first.

## Step 1: Context Detection and Tool Availability Check

### Handle Empty Arguments

If $ARGUMENTS is empty or just whitespace:

- Ask the user to provide a request with examples
- DO NOT guess from conversation history
- Show examples: `/enhance fix bug`, `/enhance implement feature X`

### Read Project Rules (CLAUDE.md)

Check for and read CLAUDE.md files:

- Use Read or Glob to find CLAUDE.md in current and parent directories
- Extract rules relevant to the detected task context
- Store for inclusion in PROJECT RULES section

### Identify Relevant MCP Tools

Based on task context, recommend appropriate MCP tools:

- For documentation needs → Recommend mcp**context7**\* tools
- For past solutions → Recommend mcp**claude-self-reflect**\* tools
- For complex analysis → Recommend mcp**zen**\* tools
- For code searches → Recommend mcp**grep**\* tools
- Always include fallback alternatives from allowed-tools

### Detect Task Type

Analyze the request to identify the primary intent:

- **Implementation**: Keywords like "implement", "create", "build", "add"
- **Analysis**: Keywords like "analyze", "introspect", "review", "evaluate"
- **Debugging**: Keywords like "fix", "debug", "troubleshoot", "solve"
- **Documentation**: Keywords like "document", "explain", "describe"
- **Architecture**: Keywords like "design", "structure", "architect"

### Context Categories

Map the request to relevant contexts:

- **File Operations**: Creating/modifying files
- **Testing**: Test creation or validation
- **Code Quality**: Refactoring, optimization
- **Operations**: Deployment, configuration

### Dynamic External Tool Mapping

Based on context AND availability, identify helpful tools:

- If context7 MCP available → Use for library/framework documentation
- Else → Use general documentation search approaches
- If claude-self-reflect MCP available → Search for past solutions
- Else → Use git log, Grep, or file search for history (from allowed-tools)
- If specific sub-agents available → Recommend appropriate ones
- Always available → Task sub-agent for complex operations (from allowed-tools)

## Step 2: Generate Enhanced Prompt Using This Template

Use ONLY plain text format with uppercase section headers:

```
Enhanced Prompt: [Clear title based on $ARGUMENTS]

DETECTED TASK TYPE:
[Primary intent: Implementation/Analysis/Debugging/Documentation/Architecture]
[Relevant contexts: file-operations, testing, code-quality, etc.]

CONTEXT & MOTIVATION:
[3-5 sentences explaining why this matters]
[Background information and current situation]
[Why each requirement is important]

CONTRARIAN ANALYSIS (EARLY):
- Is this solving the real problem or just symptoms?
- What assumptions are we making that could be wrong?
- Could a simpler approach achieve the same result?
- What if we did nothing instead?
- Is there a 10x better solution we're missing?

CONTRARIAN-INFORMED ADJUSTMENTS:
Based on the contrarian analysis:
- [Adjusted approach if addressing symptoms not root cause]
- [Validated assumptions or identified risks]
- [Simpler alternative if identified]
- [Justification for action vs. doing nothing]
- [Any 10x solution opportunities]

EXTERNAL TOOLS & RESOURCES (DYNAMIC):
[Check MCP availability first, then recommend]
- [If context7 available: Use for docs, else: Use Read/Glob for local docs]
- [If claude-self-reflect available: Search past solutions, else: Use git log/Grep]
- [Only recommend tools that are actually available or in allowed-tools]
- [Always include fallback alternatives from allowed-tools]

PROJECT RULES:
[Detected context: list categories]
- [Specific CLAUDE.md rule relevant to this context]
- [Another relevant rule]
- [Only include rules that directly apply]

OBJECTIVE:
[One clear sentence stating what needs to be accomplished]

REQUIREMENTS (CONTRARIAN-INFORMED):
Original requirements:
- [Initial requirement 1]
- [Initial requirement 2] 🔄

Adjusted based on contrarian analysis:
- [Root cause investigation requirement]
- [Assumption validation requirement]
- [Simpler approach requirement if applicable]
- [Measurement to justify action vs. doing nothing]
- [10x opportunity exploration if identified]
- [Mark parallel operations with 🔄]
- [Each should be measurable]
- [Include validation steps]

EDGE CASES & ROBUSTNESS:
- [Boundary conditions: empty, null, maximum values]
- [Concurrent access scenarios]
- [External dependency failures]
- [Security implications]
- [Performance under load]
- [Error recovery paths]

CONSTRAINTS:
- [Technical limitations]
- [Time constraints]
- [Resource constraints]
- [Compatibility requirements]

DELIVERABLES:
- [Specific output 1]
- [Specific output 2]
- [Documentation updates]
- [Test coverage]

SUCCESS CRITERIA:
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] All tests pass
- [ ] Root cause addressed (not just symptoms)
- [ ] Key assumptions validated with evidence
- [ ] Simpler alternatives considered and documented
- [ ] Action justified vs. doing nothing
- [ ] Edge cases handled gracefully
- [ ] Documentation updated

MEASURABLE OUTCOMES:
- [ ] [Specific deliverable completed]
- [ ] [Quality metric achieved]
- [ ] [Performance target met]
- [ ] [User acceptance criteria]
```

## Step 3: Present Using exit_plan_mode

Call exit_plan_mode with the COMPLETE enhanced prompt:

```
exit_plan_mode(plan="[Your complete enhanced prompt here]")
```

## VALIDATION CHECKLIST

Before calling exit_plan_mode, verify:

- [ ] Read CLAUDE.md files and extracted relevant rules
- [ ] Recommended appropriate MCP tools based on task context
- [ ] Only recommended tools that match the task needs
- [ ] Included fallback alternatives for unavailable tools
- [ ] Contrarian analysis done BEFORE requirements
- [ ] Requirements adjusted based on contrarian insights
- [ ] Generated actual content, not template placeholders
- [ ] Used plain text format (no XML tags)
- [ ] Included detected task type
- [ ] Enhanced prompt is complete and actionable

## Common Mistakes to Avoid

1. **Skipping to execution** - ALWAYS generate enhanced prompt first
2. **Using XML tags** - They display as &lt; &gt; in exit_plan_mode
3. **Leaving placeholders** - Fill in all sections with real content
4. **Ignoring task type** - Different types need different emphasis
5. **Generic contrarian analysis** - Make it specific to the request

## Example of Correct Enhancement

If user types: `/enhance fix the login bug`

You should generate:

```
Enhanced Prompt: Fix the Login Bug

DETECTED TASK TYPE:
Primary intent: Debugging
Relevant contexts: code-quality, testing, authentication

CONTEXT & MOTIVATION:
Users are experiencing login failures that need immediate resolution. This is critical infrastructure affecting all users. Understanding the root cause and implementing a robust fix is essential for system reliability.

CONTRARIAN ANALYSIS (EARLY):
- Is this actually a login bug or a deployment/configuration issue?
- Are the "valid credentials" truly valid in the current system?
- Could this be a feature, not a bug (e.g., new security policy)?
- Would rolling back the latest deployment be safer?
- Are we fixing symptoms instead of the root cause?

CONTRARIAN-INFORMED ADJUSTMENTS:
Based on the contrarian analysis:
- First check deployment/configuration changes before assuming code bug
- Validate that test credentials are actually valid in production
- Review recent security policy changes that might block logins
- Consider rollback as primary option if recent deployment
- Focus on root cause identification before implementing fixes

EXTERNAL TOOLS & RESOURCES (DYNAMIC):
[After checking MCP availability]
- claude-self-reflect MCP available: Search for past login/auth debugging
- context7 MCP not available: Use Read/Glob to check local auth documentation
- reflection-specialist sub-agent available: Use for complex debugging analysis
- Task sub-agent: Always available for parallel investigations
- Fallback: Use git log and Grep for recent auth-related changes

PROJECT RULES:
[Detected context: code-quality, testing]
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
- Update existing code instead of creating new versions

OBJECTIVE:
Debug and fix the authentication bug preventing users from logging in successfully.

REQUIREMENTS (CONTRARIAN-INFORMED):
Original requirements:
- Reproduce the login failure with test credentials
- Check authentication service logs for errors 🔄
- Verify database connectivity and user records 🔄

Adjusted based on contrarian analysis:
- FIRST: Check recent deployments and config changes (might not be a bug)
- Validate test credentials are actually valid in current system
- Review security policy changes in last 7 days
- Compare working vs. non-working environment configurations 🔄
- Git log for auth-related changes in last deployment 🔄
- Only if above fails: Debug the authentication code itself
- Document whether issue was config/deployment vs. actual bug
- Add monitoring to detect config drift
- Create tests for both code AND configuration validation

EDGE CASES & ROBUSTNESS:
- Users with special characters in credentials
- Concurrent login attempts (race conditions)
- Session management edge cases
- Database connection failures
- Third-party auth provider outages
- Browser-specific authentication issues

CONSTRAINTS:
- Must maintain backward compatibility
- Cannot modify authentication API contracts
- Must preserve existing user sessions
- Fix must be deployable without downtime

DELIVERABLES:
- Fixed authentication code
- Comprehensive test suite for auth flow
- Root cause analysis document
- Deployment instructions

SUCCESS CRITERIA:
- [ ] All users can log in successfully
- [ ] No regression in existing auth features
- [ ] All authentication tests pass
- [ ] Root cause documented (config/deployment vs. code bug)
- [ ] Contrarian hypothesis validated (was it really a bug?)
- [ ] Simpler solution implemented if config/deployment issue
- [ ] Fix deployed to production
- [ ] Monitoring confirms issue resolved
- [ ] Config drift detection in place for future

MEASURABLE OUTCOMES:
- [ ] 100% login success rate restored
- [ ] Zero authentication errors in logs
- [ ] Response time under 200ms
- [ ] All test scenarios pass
```

## Remember: Enhancement First, Execution Second

The enhance command's purpose is to transform vague requests into comprehensive, actionable prompts. Always generate the enhanced prompt structure before any execution or analysis.
