---
description: Transform vague requests into well-structured prompts with context-aware CLAUDE.md integration
allowed-tools: [exit_plan_mode, Read, Glob]
---

# Enhanced Prompt Engineering with Context Awareness

Transform the following request into a comprehensive, well-structured prompt that follows Claude 4 best practices and incorporates relevant project rules from CLAUDE.md:

**Original Request**: $ARGUMENTS

## Instructions for Claude

### Step 0: Handle Empty Arguments

If $ARGUMENTS is empty or just whitespace:

1. Check the conversation history for the user's last substantive message
2. Use that message as the request to enhance
3. If no previous message exists, ask the user to provide a request to enhance with examples:
   - `/enhance fix the authentication bug` - Get a detailed debugging plan
   - `/enhance create API documentation` - Generate comprehensive docs structure
   - `/enhance optimize database queries` - Receive performance improvement strategy
   - `/enhance implement user notifications` - Get full feature implementation plan
   - `/enhance write unit tests for payment module` - Create thorough testing approach

### Step 1: Context Analysis and Rule Selection

1. **Detect CLAUDE.md**: Check for CLAUDE.md in the current project and parent directories
2. **Analyze Request Context**: Identify the task type and relevant categories:

   **Context Categories**:
   - **File Operations**: Keywords like "create", "write", "generate", "file", "document", "script"
   - **Testing**: Keywords like "test", "verify", "validate", "check", "QA", "assert"
   - **Code Quality**: Keywords like "fix", "debug", "refactor", "optimize", "improve", "clean"
   - **Documentation**: Keywords like "document", "explain", "describe", "readme", "guide"
   - **Architecture**: Keywords like "design", "structure", "pattern", "architecture", "diagram"
   - **Operations**: Keywords like "deploy", "build", "release", "configure", "setup"

3. **Select Relevant Rules**: Based on detected context, extract only applicable rules:
   - File Operations → File Management rules
   - Testing → Code Quality rules about tests
   - Documentation → Document Organization rules
   - Multiple contexts → Combine relevant rule sets

### Step 2: Generate Enhanced Prompt

Apply these transformations:

1. **Explicit Instructions**
   - Convert implicit assumptions into explicit requirements
   - Define clear success criteria and deliverables
   - Specify the desired output format

2. **Context Enhancement**
   - Add relevant background information
   - Include constraints and edge cases
   - Define the scope and boundaries

3. **Structured Format**
   - Use XML tags for clear sections
   - Organize requirements hierarchically
   - Separate concerns into distinct sections

4. **Thinking Encouragement**
   - Include reasoning steps where appropriate
   - Request analysis before implementation
   - Encourage exploration of alternatives

5. **Clarity Improvements**
   - Replace ambiguous terms with specific requirements
   - Add measurable criteria for success
   - Include examples where helpful

### Step 3: Handle Based on Mode

**If in Normal Mode**: Execute the enhanced prompt directly

**If in Plan Mode**:

YOU MUST GENERATE THE ACTUAL ENHANCED PROMPT CONTENT, NOT PASS THE TEMPLATE!

Generate a complete enhanced prompt with ALL sections filled with real content, then pass it to exit_plan_mode as a properly formatted string.

**IMPORTANT**: The exit_plan_mode tool expects a multi-line string with the enhanced prompt formatted for readability. Use actual newlines to format the content clearly.

## Enhanced Prompt Structure Template

```xml
<enhanced_prompt>
<context>
[Background and setup information]
</context>

<project_rules>
<!-- Only include if CLAUDE.md exists and has relevant rules -->
<applicable_rules context="[detected context categories]">
- [Relevant rule 1 from CLAUDE.md]
- [Relevant rule 2 from CLAUDE.md]
- [Only rules that apply to the current task]
</applicable_rules>
</project_rules>

<objective>
[Clear statement of what needs to be accomplished]
</objective>

<requirements>
- [Specific requirement 1]
- [Specific requirement 2]
- [etc.]
</requirements>

<constraints>
- [Any limitations or boundaries]
- [Technical constraints]
- [Business constraints]
</constraints>

<deliverables>
- [Expected output 1]
- [Expected output 2]
- [etc.]
</deliverables>

<success_criteria>
- [How to measure success]
- [Acceptance criteria]
</success_criteria>
</enhanced_prompt>
```

## Examples for Plan Mode

### Example 1: Simple Enhancement

If the user types: `/enhance add logging to the system`

Call exit_plan_mode with:

```
exit_plan_mode(plan="<enhanced_prompt>
<context>
The user wants to add logging functionality to the system for better debugging and monitoring capabilities.
</context>

<objective>
Implement comprehensive logging throughout the system
</objective>

<requirements>
- Add structured logging with appropriate log levels (DEBUG, INFO, WARN, ERROR)
- Include timestamps and context information in all log entries
- Ensure sensitive data (passwords, tokens, PII) is not logged
- Implement log rotation to manage disk space
- Add configuration for log levels per module
</requirements>

<deliverables>
- Logging utility module with standardized interface
- Configuration file for log settings
- Updated modules to use the new logging system
- Documentation on how to use the logging system
</deliverables>

<success_criteria>
- All modules use the centralized logging system
- No sensitive information appears in logs
- Logs are properly formatted and searchable
- Performance impact is minimal (<1% overhead)
</success_criteria>
</enhanced_prompt>")
```

### Example 2: Complex Enhancement with CLAUDE.md Rules

If the user types: `/enhance fix the authentication bug`

Call exit_plan_mode with:

```
exit_plan_mode(plan="<enhanced_prompt>
<context>
The user is experiencing an authentication bug that needs to be fixed. This involves debugging the authentication system, identifying the root cause, and implementing a fix while ensuring no regressions.
</context>

<project_rules>
<applicable_rules context="code-quality, testing">
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
- Update existing code instead of creating new versions
- Document changes appropriately
</applicable_rules>
</project_rules>

<objective>
Debug and fix the authentication bug in the system, ensuring proper functionality is restored
</objective>

<requirements>
- Investigate the authentication flow to identify where it's failing
- Check error logs and debug output for clues
- Review recent changes that might have introduced the bug
- Implement a fix that addresses the root cause
- Ensure the fix doesn't break existing functionality
- Add tests to prevent regression
</requirements>

<constraints>
- Maintain backward compatibility with existing auth tokens
- Don't modify the authentication API interface
- Preserve existing user sessions during the fix
- Follow existing code patterns and conventions
</constraints>

<deliverables>
- Fixed authentication code with the bug resolved
- Updated or new tests that verify the fix
- Brief explanation of what caused the bug
- Any necessary migration scripts if data structures changed
</deliverables>

<success_criteria>
- All authentication tests pass
- Users can successfully log in and maintain sessions
- No regression in existing authentication features
- The specific reported bug no longer occurs
</success_criteria>
</enhanced_prompt>")
```

### Key Points for Plan Mode

1. **Generate complete content** - Fill in ALL sections with real information
2. **Use readable formatting** - Format with actual newlines for clarity
3. **Include relevant rules** - Only add CLAUDE.md rules that apply to the task
4. **Be specific** - No placeholders or generic content
5. **Make it actionable** - The user should understand exactly what will be done

## Implementation Process

1. First, I'll check for CLAUDE.md files in the project
2. Analyze your request to determine the context
3. Select only the relevant rules for your task
4. Generate an enhanced prompt with contextual project rules
5. If in plan mode, present it via exit_plan_mode with proper formatting

Now, I'll analyze your request and generate the context-aware enhanced prompt.
