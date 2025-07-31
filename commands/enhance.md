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

## Step 1: Context Detection and Analysis

### Handle Empty Arguments

If $ARGUMENTS is empty or just whitespace:

- Ask the user to provide a request with examples
- DO NOT guess from conversation history
- Show examples: `/enhance fix bug`, `/enhance implement feature X`

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

### External Tool Mapping

Based on context, identify helpful tools:

- Library/Framework tasks → context7 MCP for latest docs
- Past solutions → claude-self-reflect MCP (github.com/ramakay/claude-self-reflect)
- Complex analysis → reflection-specialist sub-agent
- Parallel tasks → Task sub-agent

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

EXTERNAL TOOLS & RESOURCES:
- Use context7 MCP for [specific documentation needs]
- Search claude-self-reflect MCP for [past similar solutions]
- Leverage [specific sub-agent] for [specific complex task]
- [Other relevant tools based on detected context]

PROJECT RULES:
[Detected context: list categories]
- [Specific CLAUDE.md rule relevant to this context]
- [Another relevant rule]
- [Only include rules that directly apply]

OBJECTIVE:
[One clear sentence stating what needs to be accomplished]

REQUIREMENTS:
- [Specific, actionable requirement 1]
- [Specific, actionable requirement 2] 🔄
- [Mark parallel operations with 🔄]
- [Include 5-10 requirements]
- [Each should be measurable]
- [Include validation steps]

CONTRARIAN ANALYSIS:
- Is this solving the real problem or just symptoms?
- What assumptions are we making that could be wrong?
- Could a simpler approach achieve the same result?
- What if we did nothing instead?
- Is there a 10x better solution we're missing?

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
- [ ] Contrarian concerns addressed
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

- [ ] Generated actual content, not template placeholders
- [ ] Used plain text format (no XML tags)
- [ ] Included detected task type
- [ ] Populated all sections appropriately
- [ ] Marked "Not applicable" for irrelevant sections
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

EXTERNAL TOOLS & RESOURCES:
- Search claude-self-reflect MCP for past login/auth debugging sessions
- Use reflection-specialist sub-agent for complex debugging analysis
- Check context7 MCP for latest authentication library documentation

PROJECT RULES:
[Detected context: code-quality, testing]
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
- Update existing code instead of creating new versions

OBJECTIVE:
Debug and fix the authentication bug preventing users from logging in successfully.

REQUIREMENTS:
- Reproduce the login failure with test credentials
- Check authentication service logs for errors 🔄
- Verify database connectivity and user records 🔄
- Test login flow across different browsers 🔄
- Identify the root cause through systematic debugging
- Implement a fix that addresses the core issue
- Add comprehensive error handling
- Create tests to prevent regression
- Document the fix and root cause

CONTRARIAN ANALYSIS:
- Is this actually a login bug or a deployment/configuration issue?
- Are the "valid credentials" truly valid in the current system?
- Could this be a feature, not a bug (e.g., new security policy)?
- Would rolling back the latest deployment be safer?
- Are we fixing symptoms instead of the root cause?

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
- [ ] Root cause documented
- [ ] Fix deployed to production
- [ ] Monitoring confirms issue resolved

MEASURABLE OUTCOMES:
- [ ] 100% login success rate restored
- [ ] Zero authentication errors in logs
- [ ] Response time under 200ms
- [ ] All test scenarios pass
```

## Remember: Enhancement First, Execution Second

The enhance command's purpose is to transform vague requests into comprehensive, actionable prompts. Always generate the enhanced prompt structure before any execution or analysis.
