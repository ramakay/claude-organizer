---
description: Transform vague requests into well-structured prompts - works in both normal and plan modes
allowed-tools: [exit_plan_mode]
---

# Enhanced Prompt Engineering

Transform the following request into a comprehensive, well-structured prompt that follows Claude 4 best practices:

**Original Request**: $ARGUMENTS

## Instructions for Claude

First, check if we're in plan mode by attempting a simple operation. If in plan mode, use exit_plan_mode to present the enhanced prompt as a plan.

### Step 1: Generate Enhanced Prompt

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

### Step 2: Handle Based on Mode

**If in Normal Mode**: Execute the enhanced prompt directly

**If in Plan Mode**:

1. Call exit_plan_mode with the enhanced prompt as the plan
2. This will show the user the enhanced prompt and ask for confirmation
3. If approved, the enhanced prompt will be executed

## Enhanced Prompt Structure Template

```xml
<enhanced_prompt>
<context>
[Background and setup information]
</context>

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

## Examples of Enhancement

**Vague**: "fix the broken thing"
**Enhanced**: "Debug and repair the authentication system that is failing to validate user credentials, ensuring proper error handling and logging"

**Vague**: "make it work better"
**Enhanced**: "Optimize the database query performance by implementing proper indexing, query caching, and connection pooling to reduce response times by 50%"

**Vague**: "what were the achievements"
**Enhanced**: "Provide a detailed, evidence-based summary of all concrete achievements in the project, categorized by problem solved and impact delivered, with specific metrics and examples"

Now, I'll generate the enhanced prompt. If we're in plan mode, I'll use exit_plan_mode to present it properly.
