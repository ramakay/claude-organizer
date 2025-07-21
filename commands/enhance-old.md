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

### CRITICAL: Format the enhanced prompt as readable text!

The exit_plan_mode tool will display your plan to the user. Generate the COMPLETE enhanced prompt with:

1. **Real, filled-in content** - No placeholders or templates
2. **Readable formatting** - Use actual newlines for readability
3. **Complete all sections** - Context, objectives, requirements, etc.
4. **Include relevant CLAUDE.md rules** - Only those that apply
5. **Make it actionable** - The user should understand exactly what will be done

### How to Call exit_plan_mode:

```
exit_plan_mode(plan="YOUR_ENHANCED_PROMPT_HERE")
```

Where YOUR_ENHANCED_PROMPT_HERE is the complete, formatted enhanced prompt with all sections filled in with real content based on the user's request.

### WRONG (These will create empty plans):

```
# WRONG: Multi-line string
exit_plan_mode(plan="<enhanced_prompt>
<context>
This has actual newlines
</context>
</enhanced_prompt>")

# WRONG: Unescaped quotes
exit_plan_mode(plan="<rules>Use "quotes" properly</rules>")

# WRONG: Template placeholders
exit_plan_mode(plan="<context>[Background info]</context>")
```

### CORRECT (This will work):

```
exit_plan_mode(plan="<enhanced_prompt>
<context>
The user is experiencing an issue with the /enhance command generating empty plans. They've provided an interaction showing the problem and want a comprehensive fix.
</context>
<objective>
Fix the /enhance command to properly generate filled-in enhanced prompts instead of passing empty templates
</objective>
<requirements>
- Identify root cause of empty plan generation
- Update enhance.md with clearer instructions
- Ensure Claude generates actual content, not templates
- Test the fix to verify it works
</requirements>
<project_rules>
<applicable_rules context="code-quality">
- ALWAYS verify functionality before declaring completion
- Document changes appropriately
</applicable_rules>
</project_rules>
</enhanced_prompt>")
```

### Enhanced Prompt Checklist

Before calling exit_plan_mode, verify:

- [ ] Did you generate ACTUAL content (not templates)?
- [ ] Are all sections filled with real information?
- [ ] Did you include only relevant CLAUDE.md rules?
- [ ] Is the prompt clear and actionable?
- [ ] Will the user understand what will be done?

THE PLAN MUST BE THE ACTUAL ENHANCED PROMPT WITH REAL CONTENT!

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

## Examples of Enhancement with Context-Aware Rules

### Example 1: Testing Context

**Original**: "fix the broken tests"
**Detected Context**: Testing, Code Quality
**Selected CLAUDE.md Rules**:

- "NEVER claim success if tests are failing"
- "ALWAYS verify functionality before declaring completion"

**Enhanced Prompt**:

```xml
<project_rules>
<applicable_rules context="testing, code-quality">
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
</applicable_rules>
</project_rules>
<objective>Debug and fix failing test cases, ensuring all tests pass before completion</objective>
```

### Example 2: File Creation Context

**Original**: "create a deployment guide"
**Detected Context**: Documentation, Operations, File Operations
**Selected CLAUDE.md Rules**:

- "docs/operations/ - Deployment guides, runbooks"
- "Create focused .md files for different purposes"

**Enhanced Prompt**:

```xml
<project_rules>
<applicable_rules context="documentation, operations, file-operations">
- docs/operations/ - Deployment guides, runbooks, operational docs
- Create focused .md files for different purposes (they'll be auto-organized)
</applicable_rules>
</project_rules>
<objective>Create a comprehensive deployment guide in markdown format</objective>
```

### Example 3: Code Improvement Context

**Original**: "make it work better"
**Detected Context**: Code Quality, Optimization
**Selected CLAUDE.md Rules**:

- "Update existing scripts instead of creating new versions"
- "Document changes appropriately"

## Implementation Process

1. First, I'll check for CLAUDE.md files in the project
2. Analyze your request to determine the context
3. Select only the relevant rules for your task
4. Generate an enhanced prompt with contextual project rules
5. If in plan mode, present it via exit_plan_mode

## COMPLETE EXAMPLES FOR PLAN MODE

### Example 1: Simple Enhancement Request

If the user types: `/enhance add logging to the system`

```
exit_plan_mode(plan="<enhanced_prompt>
<context>
The user wants to add logging functionality to the system for better debugging and monitoring capabilities.
</context>
<objective>
Implement comprehensive logging throughout the system
</objective>
<requirements>
- Add structured logging with appropriate log levels
- Include timestamps and context information
- Ensure sensitive data is not logged
</requirements>
</enhanced_prompt>")
```

### Example 2: Complex Enhancement with Quotes and Rules

If the user types: `/enhance fix the authentication bug`

```
exit_plan_mode(plan="<enhanced_prompt>\n<context>\nThe user is experiencing an authentication bug that needs to be fixed. This involves debugging the authentication system, identifying the root cause, and implementing a fix while ensuring no regressions.\n</context>\n<project_rules>\n<applicable_rules context=\"code-quality, testing\">\n- NEVER claim success if tests are failing\n- ALWAYS verify functionality before declaring completion\n- Update existing code instead of creating new versions\n</applicable_rules>\n</project_rules>\n<objective>\nDebug and fix the authentication bug in the system, ensuring proper functionality is restored\n</objective>\n<requirements>\n- Investigate the authentication flow to identify where it's failing\n- Check error logs and debug output for clues\n- Review recent changes that might have introduced the bug\n- Implement a fix that addresses the root cause\n- Ensure the fix doesn't break existing functionality\n</requirements>\n<constraints>\n- Maintain backward compatibility with existing auth tokens\n- Don't modify the authentication API interface\n- Preserve existing user sessions during the fix\n</constraints>\n<deliverables>\n- Fixed authentication code with the bug resolved\n- Updated tests that verify the fix\n- Brief explanation of what caused the bug\n</deliverables>\n<success_criteria>\n- All authentication tests pass\n- Users can successfully log in and maintain sessions\n- No regression in existing authentication features\n</success_criteria>\n</enhanced_prompt>")
```

### Example 3: Enhancement with Special Characters

If the user types: `/enhance create a "config" parser that handles JSON & XML`

```
exit_plan_mode(plan="<enhanced_prompt>\n<context>\nThe user needs a configuration parser that can handle both JSON and XML formats. The parser should be flexible and handle special characters properly.\n</context>\n<objective>\nCreate a robust configuration parser supporting both JSON and XML formats with proper handling of special characters like \"quotes\", &amp; ampersands, and other symbols\n</objective>\n<requirements>\n- Support parsing JSON files with nested objects\n- Support parsing XML files with attributes and namespaces\n- Handle special characters: quotes (\"), ampersands (&amp;), less than (&lt;), greater than (&gt;)\n- Provide unified interface for both formats\n- Include error handling for malformed files\n</requirements>\n</enhanced_prompt>")
```

### Example 4: Enhancement with Code Snippets

If the user types: `/enhance add a function to validate email addresses`

```
exit_plan_mode(plan="<enhanced_prompt>\n<context>\nThe user needs an email validation function to ensure proper email format before processing.\n</context>\n<objective>\nCreate a robust email validation function with comprehensive format checking\n</objective>\n<requirements>\n- Support standard email formats like user@domain.com\n- Handle special cases: plus addressing (user+tag@domain.com)\n- Validate against RFC 5322 specification\n- Return clear error messages for invalid formats\n- Include unit tests with examples like: \"test@example.com\", \"user+tag@domain.co.uk\"\n</requirements>\n<deliverables>\n- Email validation function with regex pattern\n- Unit tests covering edge cases\n- Documentation with usage examples\n</deliverables>\n</enhanced_prompt>")
```

### Example 5: Empty Arguments (Conversation History)

If the user types just: `/enhance`

```
exit_plan_mode(plan="<enhanced_prompt>\n<context>\nBased on the conversation history, the user was discussing [previous topic]. This enhancement will address that request.\n</context>\n<objective>\n[Objective based on previous conversation]\n</objective>\n<requirements>\n- [Requirements derived from context]\n</requirements>\n</enhanced_prompt>")
```

### Key Points for ALL Examples:

1. **ENTIRE call on ONE line** - No line breaks in the string
2. **ALL newlines as \n** - Never use actual line breaks
3. **ALL quotes escaped as \"** - Including quotes in requirements
4. **Special XML characters** - Use &amp; for &, &lt; for <, &gt; for >
5. **Real content** - No placeholders or templates
6. **Backslashes** - If you need a backslash, use \\\\ (double escape)
7. **Long strings** - Even very long enhanced prompts must be on ONE line

## Troubleshooting Empty Plans

### Problem: Plan appears empty or shows "{}"

**Cause**: Multi-line strings or unescaped characters
**Solution**: Ensure the entire exit_plan_mode call is on ONE line with proper escaping

### Problem: XML tags are not showing

**Cause**: XML tags being interpreted as HTML
**Solution**: Make sure you're passing them as plain text in the string

### Problem: Quotes causing syntax errors

**Cause**: Unescaped quotes breaking the string
**Solution**: Replace ALL " with \" in your content

### Problem: Content appears cut off

**Cause**: Newlines breaking the string
**Solution**: Replace ALL newlines with \n

### Quick Debug Checklist

1. Copy your exit_plan_mode call to a text editor
2. Verify it's all on ONE line
3. Search for unescaped quotes (")
4. Search for actual newlines
5. Check for special characters that need escaping

### If Still Having Issues

- Start with a simple example and gradually add complexity
- Test with minimal content first
- Add sections one at a time to identify which part causes issues
- Remember: The plan parameter expects a single-line string with escaped characters

## Common Mistakes to Avoid

1. **Using actual newlines in the string** - This is the #1 cause of empty plans
2. **Forgetting to escape quotes in CLAUDE.md rules** - Rules often contain quotes
3. **Using template literals or multi-line strings** - Always use regular strings
4. **Passing the template instead of generated content** - Fill in ALL sections
5. **Missing backslash escaping** - File paths like C:\\Users need \\\\
6. **Not escaping XML entities** - Use &amp;, &lt;, &gt; for >, <, >
7. **Breaking the string across multiple lines for readability** - DON'T! Keep it on one line

## Final Reminder

The exit_plan_mode expects a single-line string. No matter how long your enhanced prompt is, it must be formatted as one continuous line with proper escape sequences. This is not a limitation of the tool - it's how string parameters work in function calls.

---

Now I'll analyze your request and generate the properly formatted enhanced prompt for plan mode.
