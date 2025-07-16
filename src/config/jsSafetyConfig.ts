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
        // Handle both absolute and relative paths
        const normalizedPath = filePath.replace(/\\/g, '/')

        // Debug logging
        if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
          console.log('[Path Safety Check] Checking:', filePath)
          console.log('[Path Safety Check] Normalized:', normalizedPath)
        }

        // Allow bypass for testing/debugging
        if (process.env.CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK === 'true') {
          if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
            console.log(
              '[Path Safety Check] BYPASSED via CLAUDE_ORGANIZE_JS_BYPASS_PATH_CHECK'
            )
          }
          return true
        }

        // If it's an absolute path, get only the relative part from project root
        const pathParts = normalizedPath.split('/')
        let relativeParts: string[] = []

        // Find where the project-specific path starts
        // Look for common project indicators
        let foundProjectRoot = false
        for (let i = pathParts.length - 1; i >= 0; i--) {
          relativeParts.unshift(pathParts[i])

          // Stop when we hit common project root indicators
          if (
            pathParts[i].match(
              /^(src|lib|app|web|client|server|packages|apps)$/
            )
          ) {
            foundProjectRoot = true
            if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
              console.log(
                '[Path Safety Check] Found project root:',
                pathParts[i]
              )
            }
            break
          }

          // Also stop if we've collected more than 5 parts (safety limit)
          if (relativeParts.length > 5) {
            break
          }
        }

        // If we found a project root, check depth from there
        if (foundProjectRoot) {
          if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
            console.log('[Path Safety Check] Project structure detected - PASS')
          }
          return true // File is within a recognized project structure
        }

        // For simple relative paths or unrecognized structures
        // Check if this looks like a project path (contains common project folders in the full path)
        const fullPathStr = normalizedPath.toLowerCase()
        const isLikelyProjectPath =
          fullPathStr.includes('/projects/') ||
          fullPathStr.includes('/workspace/') ||
          fullPathStr.includes('/home/') ||
          fullPathStr.includes('/users/') ||
          fullPathStr.includes('/documents/') ||
          fullPathStr.includes('/desktop/')

        if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
          console.log(
            '[Path Safety Check] Is likely project path:',
            isLikelyProjectPath
          )
          console.log('[Path Safety Check] Relative parts:', relativeParts)
        }

        if (isLikelyProjectPath) {
          // For project paths, we need to find the actual project-relative depth
          // Find where the project folder is in the path
          let projectStartIndex = -1
          const projectMarkers = [
            'projects',
            'workspace',
            'repositories',
            'repos',
            'code',
            'dev',
          ]

          for (let i = 0; i < pathParts.length; i++) {
            if (projectMarkers.includes(pathParts[i].toLowerCase())) {
              projectStartIndex = i + 1 // Start counting after the projects folder
              break
            }
          }

          let actualRelativeDepth = 0
          if (projectStartIndex > 0 && projectStartIndex < pathParts.length) {
            // Count only the parts after the project marker
            const relevantParts = pathParts
              .slice(projectStartIndex)
              .filter((p) => p && p !== '.')
            actualRelativeDepth = relevantParts.length - 1 // Subtract 1 for the filename
          } else {
            // Fallback to the collected relative parts
            actualRelativeDepth =
              relativeParts.filter((p) => p && p !== '.').length - 1
          }

          const passed = actualRelativeDepth <= 2 // Allow files at project root or 1-2 levels deep
          if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
            console.log(
              '[Path Safety Check] Project start index:',
              projectStartIndex
            )
            console.log(
              '[Path Safety Check] Actual relative depth:',
              actualRelativeDepth,
              'Pass:',
              passed
            )
          }
          return passed
        }

        // For other paths, be more restrictive
        if (process.env.CLAUDE_ORGANIZE_DEBUG === 'true') {
          console.log(
            '[Path Safety Check] Not a recognized project path - FAIL'
          )
        }
        return false
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
