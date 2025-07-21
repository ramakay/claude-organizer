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

1. Read the user's request carefully
2. Generate ACTUAL CONTENT for each section based on the request
3. DO NOT use placeholders like [Background] - write the REAL background
4. DO NOT use brackets [] anywhere - write actual content
5. Create a complete, ready-to-execute enhanced prompt as a single string
6. Pass this string to exit_plan_mode(plan="your generated content here")

WRONG (DO NOT DO THIS):

```
exit_plan_mode(plan="<context>[Background and setup information]</context>")
```

CORRECT (DO THIS):

```
exit_plan_mode(plan="<enhanced_prompt>\n<context>\nThe user is experiencing an issue with the /enhance command generating empty plans. They've provided an interaction showing the problem and want a comprehensive fix.\n</context>\n<objective>\nFix the /enhance command to properly generate filled-in enhanced prompts instead of passing empty templates\n</objective>\n<requirements>\n- Identify root cause of empty plan generation\n- Update enhance.md with clearer instructions\n- Ensure Claude generates actual content, not templates\n- Test the fix to verify it works\n</requirements>\n</enhanced_prompt>")
```

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

## COMPLETE EXAMPLE FOR PLAN MODE

If the user types: `/enhance fix the authentication bug`

You should call exit_plan_mode with ACTUAL CONTENT like this:

```
exit_plan_mode(plan="<enhanced_prompt>
<context>
The user is experiencing an authentication bug that needs to be fixed. This involves debugging the authentication system, identifying the root cause, and implementing a fix while ensuring no regressions.
</context>

<project_rules>
<applicable_rules context=\"code-quality, testing\">
- NEVER claim success if tests are failing
- ALWAYS verify functionality before declaring completion
- Update existing code instead of creating new versions
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
</requirements>

<constraints>
- Maintain backward compatibility with existing auth tokens
- Don't modify the authentication API interface
- Preserve existing user sessions during the fix
</constraints>

<deliverables>
- Fixed authentication code with the bug resolved
- Updated tests that verify the fix
- Brief explanation of what caused the bug
</deliverables>

<success_criteria>
- All authentication tests pass
- Users can successfully log in and maintain sessions
- No regression in existing authentication features
</success_criteria>
</enhanced_prompt>")
```

NEVER pass the template with brackets! Always generate real content!

Now, I'll analyze your request and generate the context-aware enhanced prompt.
