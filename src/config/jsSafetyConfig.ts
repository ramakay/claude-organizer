/**
 * Ultra-careful configuration for handling JavaScript/MJS files
 * This is a high-stakes feature that requires extreme caution
 */

export const jsSafetyConfig = {
  // Minimum confidence required to organize a JS/MJS file
  MIN_CONFIDENCE_THRESHOLD: 95,

  // Files matching these patterns are NEVER organized
  absoluteSkipPatterns: [
    // Core application structure
    'src/**/*.{js,mjs,ts,tsx}',
    'lib/**/*.{js,mjs}',
    'dist/**/*.{js,mjs}',
    'build/**/*.{js,mjs}',

    // Framework/build files
    '*.config.{js,mjs}',
    '**/index.{js,mjs}',
    '**/main.{js,mjs}',
    '**/app.{js,mjs}',

    // Package entry points
    'server.{js,mjs}',
    'client.{js,mjs}',
    'index.{js,mjs}',

    // Test frameworks (these have structure)
    '**/*.test.{js,mjs}',
    '**/*.spec.{js,mjs}',
    '__tests__/**/*',

    // Dependencies
    'node_modules/**/*',
    'vendor/**/*',
    '.next/**/*',
    '.nuxt/**/*',
  ],

  // Safe patterns that can be considered for organization
  safeUtilityPatterns: [
    // Clear utility prefixes
    'check-*.{js,mjs}',
    'test-*.{js,mjs}',
    'debug-*.{js,mjs}',
    'analyze-*.{js,mjs}',
    'create-test-*.{js,mjs}',
    'validate-*.{js,mjs}',
    'cleanup-*.{js,mjs}',
    'fix-*.{js,mjs}',
    'diagnose-*.{js,mjs}',
    'backup-*.{js,mjs}',
    'migrate-*.{js,mjs}',
    'seed-*.{js,mjs}',
    'generate-*.{js,mjs}',

    // Clear temporary patterns
    'temp-*.{js,mjs}',
    'tmp-*.{js,mjs}',
    'draft-*.{js,mjs}',
    'old-*.{js,mjs}',
    'deprecated-*.{js,mjs}',
  ],

  // Required indicators for a file to be considered a utility
  utilityIndicators: {
    required: 1, // Must have at least 1
    patterns: [
      /^#!/, // Shebang line
      /process\.exit\(/,
      /console\.(log|error|warn|info)/,
      /process\.argv/,
      /require\(['"]commander['"]\)/,
      /require\(['"]yargs['"]\)/,
      /import .* from ['"]commander['"]/,
      /import .* from ['"]yargs['"]/,
    ],
  },

  // Danger indicators that suggest core code
  dangerIndicators: {
    maxAllowed: 0, // If ANY are found, skip the file
    patterns: [
      /export\s+(default|{|function|class|const)/,
      /module\.exports\s*=/,
      /exports\.\w+\s*=/,
      /class\s+\w+\s+extends\s+Component/,
      /class\s+\w+\s+extends\s+React/,
      /@Controller\(/,
      /@Injectable\(/,
      /@Module\(/,
      /router\.(get|post|put|delete|patch)/,
      /app\.(get|post|put|delete|patch)/,
      /mongoose\.model\(/,
      /sequelize\.define\(/,
    ],
  },

  // Multi-pass validation
  validationPasses: [
    {
      name: 'Path Safety Check',
      check: (filePath: string) => {
        // Check if file is in a safe location (root or specific folders)
        const depth = filePath.split('/').length
        return depth <= 2 // Only root or one level deep
      },
    },
    {
      name: 'Size Check',
      check: (content: string) => {
        // Large files are more likely to be core code
        return content.length < 10000 // Less than 10KB
      },
    },
    {
      name: 'Import/Export Check',
      check: (content: string) => {
        // Quick scan for module patterns
        const hasExports = /export|module\.exports/i.test(content)
        const hasComplexImports =
          (content.match(/import|require/g) || []).length > 5
        return !hasExports && !hasComplexImports
      },
    },
  ],
}

export const jsAnalysisPrompt = `
CRITICAL SAFETY ANALYSIS: JavaScript/MJS File Organization Decision

You are performing a HIGH-STAKES analysis to determine if a JavaScript/MJS file should be organized.
Moving the wrong file could break production systems, so extreme caution is required.

FILE CONTENT TO ANALYZE:
{{{content}}}

FILE PATH: {{{filePath}}}

ANALYZE WITH EXTREME CARE:

1. PURPOSE DETECTION:
   - What does this file do?
   - Is it a one-off utility or core application code?
   - Does it appear to be temporary or permanent?

2. SAFETY INDICATORS (suggests safe to organize):
   - #!/usr/bin/env node shebang
   - Command-line argument parsing
   - Console output for human reading
   - Self-contained script with process.exit()
   - No exports or module.exports
   - Utility naming patterns (check-, test-, debug-, etc.)
   - Temporary or experimental code

3. DANGER INDICATORS (MUST NOT organize):
   - Exports functions/classes/constants
   - Part of application architecture
   - Database models or API routes
   - React/Vue/Angular components
   - Service layer code
   - Could be imported by other files

4. CONTEXT CLUES:
   - File location (root = more likely utility)
   - File naming conventions
   - Code style and structure
   - Presence of tests for this file

DECISION CRITERIA:
- Only return "organize" if confidence >= 95%
- When in doubt, ALWAYS choose "skip"
- Consider the catastrophic risk of breaking production

RESPOND WITH THIS EXACT JSON FORMAT:
{
  "decision": "organize" or "skip",
  "confidence": 0-100,
  "reasoning": "Detailed explanation of your decision",
  "risk_factors": ["List", "of", "potential", "risks"],
  "file_purpose": "Brief description of what this file does",
  "key_indicators": {
    "utility_signals": ["List", "of", "utility", "indicators", "found"],
    "danger_signals": ["List", "of", "danger", "indicators", "found"]
  }
}`
