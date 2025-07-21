---
description: Transform requests into detailed, actionable prompts
allowed-tools: [exit_plan_mode, Read, Glob]
---

# Enhance Request

Transform this request into a comprehensive prompt:

**Original Request**: $ARGUMENTS

## Instructions

1. Check for CLAUDE.md project rules if they exist
2. Extract only rules relevant to the specific task
3. Create a structured prompt using markdown headers
4. Be comprehensive but concise - add only necessary detail
5. Include all sections shown below

## Enhanced Prompt Format

Use this exact structure with markdown headers:

### Context

Write 3-5 sentences about:

- Background and current situation
- Why this task is needed
- Any constraints or considerations

### Requirements

List 5-10 specific steps:

- Each requirement should be actionable
- Include validation and error handling
- Consider edge cases
- Be specific and measurable

### Project Rules

- Include relevant CLAUDE.md rules if found
- Or write "No project-specific rules found"

### Success Criteria

List 3-5 criteria that define completion:

- Must be measurable
- Should be verifiable
- Define what "done" looks like

## Example

Input: "fix the login bug"

Output:

### Context

Users are reporting login failures with valid credentials. The issue started after the latest deployment. This is affecting customer access and needs immediate resolution.

### Requirements

- Reproduce the login failure with test credentials
- Check authentication service logs for errors
- Verify database connectivity and user records
- Test login flow with different browsers
- Check for recent code changes to auth module
- Fix the root cause of authentication failures
- Add error handling for edge cases
- Test the fix thoroughly before deployment

### Project Rules

From CLAUDE.md: NEVER claim success if tests are failing. ALWAYS verify functionality before declaring completion.

### Success Criteria

- Users can log in successfully with valid credentials
- Failed login attempts show appropriate error messages
- No errors in authentication service logs
- All auth-related tests pass

Use exit_plan_mode to present your enhanced prompt.
