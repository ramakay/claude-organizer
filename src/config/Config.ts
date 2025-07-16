import * as path from 'path'
import * as fs from 'fs'

export class Config {
  private readonly env: Record<string, string | undefined>

  constructor() {
    this.env = process.env
  }

  get logPath(): string {
    return (
      this.env.CLAUDE_ORGANIZE_LOG_PATH ||
      path.join(process.cwd(), 'docs', 'organization-log.json')
    )
  }

  get debugEnabled(): boolean {
    return this.env.CLAUDE_ORGANIZE_DEBUG === 'true'
  }

  get organizationBaseDir(): string {
    // Default to current working directory
    return process.cwd()
  }

  get bypassEnabled(): boolean {
    return this.env.CLAUDE_ORGANIZE_BYPASS === 'true'
  }

  get skipPatterns(): string[] {
    // Comprehensive default patterns for files and directories that should never be moved
    const defaultPatterns = [
      // Documentation files that should stay at root
      'README.md',
      'README*',
      'CLAUDE.md',
      'LICENSE',
      'LICENSE*',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'CHANGELOG.md',
      'CHANGELOG*',
      'SECURITY.md',
      'AUTHORS',
      'CONTRIBUTORS',
      'NOTICE',
      'PATENT*',
      'TRADEMARK*',
      'CITATION*',

      // Version Control & Git
      '.git/*',
      '.gitignore',
      '.gitattributes',
      '.gitmodules',
      '.gitmessage',
      '.gitconfig',
      '.gitkeep',

      // Package Management - JavaScript/Node.js
      'package.json',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      'shrinkwrap.json',
      '.npmrc',
      '.yarnrc',
      '.yarnrc.yml',
      '.pnpmfile.cjs',
      'lerna.json',
      'rush.json',
      'pnpm-workspace.yaml',

      // Package Management - Other Languages
      'composer.json',
      'composer.lock',
      'Gemfile',
      'Gemfile.lock',
      'Cargo.toml',
      'Cargo.lock',
      'go.mod',
      'go.sum',
      'requirements.txt',
      'requirements-*.txt',
      'Pipfile',
      'Pipfile.lock',
      'poetry.lock',
      'pyproject.toml',
      'setup.py',
      'setup.cfg',
      'pubspec.yaml',
      'pubspec.lock',
      '*.toml',

      // Build & Distribution Directories
      'dist/*',
      'build/*',
      'out/*',
      'lib/*',
      'bin/*',
      'target/*',
      '.next/*',
      '.nuxt/*',
      '.output/*',
      '.svelte-kit/*',
      'public/*',
      'static/*',
      '_site/*',
      '.docusaurus/*',
      '.vuepress/dist/*',
      'docs/.vitepress/dist/*',
      'site/*',

      // IDE & Editor
      '.vscode/*',
      '.idea/*',
      '*.iml',
      '*.swp',
      '*.swo',
      '*~',
      '.project',
      '.classpath',
      '.settings/*',
      '*.sublime-*',
      '.atom/*',
      '.brackets.json',
      '.vimrc',
      '.vim/*',
      '.emacs*',
      '.spacemacs*',

      // Testing & Coverage
      'coverage/*',
      '.nyc_output/*',
      'test-results/*',
      '.jest/*',
      '__tests__/*',
      '__mocks__/*',
      '__fixtures__/*',
      '__snapshots__/*',
      '.pytest_cache/*',
      '.tox/*',
      '.nox/*',
      'htmlcov/*',
      '.coverage',
      'coverage.xml',
      '*.lcov',

      // CI/CD & Deployment
      '.github/*',
      '.gitlab/*',
      '.gitlab-ci.yml',
      '.travis.yml',
      '.circleci/*',
      'circle.yml',
      'appveyor.yml',
      '.jenkins/*',
      'Jenkinsfile',
      'azure-pipelines.yml',
      '.drone.yml',
      'bitbucket-pipelines.yml',
      '.buildkite/*',
      'cloudbuild.yaml',
      '.semaphore/*',
      '.codeship*',
      'wercker.yml',
      '.teamcity/*',

      // Cloud & Infrastructure
      '.vercel/*',
      'vercel.json',
      '.netlify/*',
      'netlify.toml',
      '.amplify/*',
      'amplify.yml',
      '.firebase/*',
      'firebase.json',
      '.firebaserc',
      'app.yaml',
      '.elasticbeanstalk/*',
      '.ebextensions/*',
      'now.json',
      'render.yaml',
      'heroku.yml',
      'Procfile',
      '.platform/*',
      'fly.toml',
      'railway.json',
      'railway.toml',

      // Container & Orchestration
      'Dockerfile',
      'Dockerfile*',
      'docker-compose*.yml',
      'docker-compose*.yaml',
      '.dockerignore',
      'kubernetes/*',
      'k8s/*',
      'helm/*',
      'charts/*',
      'docker/*',
      'containers/*',
      'skaffold.yaml',
      'tilt*',

      // Monorepo & Workspace
      'nx.json',
      'workspace.json',
      'turbo.json',
      '.turbo/*',
      'packages/*',
      'apps/*',
      'libs/*',
      'tools/*',
      '.changeset/*',
      '.yarn/*',

      // Configuration Files
      '.editorconfig',
      '.prettierrc*',
      '.prettierignore',
      'prettier.config.*',
      '.eslintrc*',
      '.eslintignore',
      'eslint.config.*',
      '.stylelintrc*',
      '.stylelintignore',
      'stylelint.config.*',
      '.markdownlint*',
      '.htmlhintrc',
      '.babelrc*',
      'babel.config.*',
      'tsconfig*.json',
      'jsconfig*.json',
      'tslint.json',
      '.swcrc',

      // Build Tools Configuration
      'webpack.config.*',
      'rollup.config.*',
      'vite.config.*',
      'snowpack.config.*',
      'parcel.config.*',
      'esbuild.config.*',
      'gulpfile.*',
      'Gruntfile.*',
      'brunch-config.*',
      'bs-config.*',
      'karma.conf.*',
      'protractor.conf.*',
      '.postcssrc*',
      'postcss.config.*',
      'tailwind.config.*',
      'windi.config.*',

      // Testing Configuration
      'jest.config.*',
      'jest.setup.*',
      'vitest.config.*',
      'cypress.json',
      'cypress.config.*',
      'playwright.config.*',
      '.mocharc*',
      'mocha.opts',
      'ava.config.*',
      'nightwatch.conf.*',
      '.testcaferc*',

      // Environment & Secrets
      '.env',
      '.env.*',
      '.env.*.local',
      '*.pem',
      '*.key',
      '*.cert',
      '*.crt',
      '*.p12',
      '*.pfx',
      '.secrets/*',
      'secrets/*',
      '.htaccess',
      '.htpasswd',
      'private/*',

      // Database & Storage
      '*.db',
      '*.sqlite',
      '*.sqlite3',
      '*.sql',
      'migrations/*',
      'seeds/*',
      '.data/*',
      'data/*',
      'database/*',
      '*.mdb',
      '*.accdb',

      // Cache & Temporary
      '.cache/*',
      'tmp/*',
      'temp/*',
      '.parcel-cache/*',
      '.webpack_cache/*',
      '.eslintcache',
      '.stylelintcache',
      '.prettiercache',
      '.sass-cache/*',
      '.rpt2_cache/*',
      '.rts2_cache*',
      '.fusebox/*',
      '.dynamodb/*',
      '.npm/*',
      '.yarn-cache/*',
      '.pnpm-store/*',

      // Dependencies & Virtual Environments
      'node_modules/*',
      'vendor/*',
      'bower_components/*',
      'jspm_packages/*',
      'web_modules/*',
      'venv/*',
      'env/*',
      '.venv/*',
      'virtualenv/*',
      '.bundle/*',
      'site-packages/*',
      '.virtualenvs/*',
      'pip-wheel-metadata/*',
      '__pypackages__/*',

      // System & OS Files
      '.DS_Store',
      'Thumbs.db',
      'desktop.ini',
      '.Spotlight-V100/*',
      '.Trashes/*',
      '.fuse_hidden*',
      '.directory',
      '.Trash-*',
      '.nfs*',
      'ehthumbs.db',
      'ehthumbs_vista.db',
      '*.stackdump',
      '[Dd]esktop.ini',
      '$RECYCLE.BIN/*',
      '*.cab',
      '*.msi',
      '*.msix',
      '*.msm',
      '*.msp',
      '*.lnk',

      // Logs & Reports
      '*.log',
      'logs/*',
      '*.log.*',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      'pnpm-debug.log*',
      'report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
      '.npm-debug.log*',
      'testem.log',
      'typings/*',
      '*.pid',
      '*.seed',
      '*.pid.lock',

      // Binary & Archives
      '*.exe',
      '*.dll',
      '*.so',
      '*.dylib',
      '*.a',
      '*.o',
      '*.obj',
      '*.class',
      '*.jar',
      '*.war',
      '*.ear',
      '*.nar',
      '*.zip',
      '*.tar',
      '*.tar.gz',
      '*.tgz',
      '*.tar.bz2',
      '*.tar.xz',
      '*.rar',
      '*.7z',
      '*.dmg',
      '*.iso',
      '*.deb',
      '*.rpm',
      '*.pkg',
      '*.apk',
      '*.app',
      '*.xpi',
      '*.gem',
      '*.egg',
      '*.whl',

      // Language Specific - Python
      '*.py[cod]',
      '__pycache__/*',
      '*$py.class',
      '.Python',
      'develop-eggs/*',
      'downloads/*',
      'eggs/*',
      '.eggs/*',
      'wheels/*',
      'share/python-wheels/*',
      '*.egg-info/*',
      '.installed.cfg',
      '*.egg',
      'MANIFEST',
      '.mypy_cache/*',
      '.dmypy.json',
      'dmypy.json',
      '.pyre/*',
      '.pytype/*',
      'celerybeat-schedule',
      'celerybeat.pid',
      '*.sage.py',
      '.ipynb_checkpoints/*',
      'profile_default/*',
      'ipython_config.py',
      '.python-version',
      'Pipfile.lock',
      '__pypackages__/*',

      // Language Specific - Java/Kotlin/Scala
      '.gradle/*',
      'gradle/*',
      'gradlew',
      'gradlew.bat',
      'gradle.properties',
      'gradle-wrapper.properties',
      '.gradletasknamecache',
      '*.ipr',
      '*.iws',
      '/out/*',
      '.idea_modules/*',
      'atlassian-ide-plugin.xml',
      '.mvn/*',
      'mvnw',
      'mvnw.cmd',
      'pom.xml',
      '.m2/*',
      '*.class',
      '*.ctxt',
      '.mtj.tmp/*',
      'hs_err_pid*',
      'replay_pid*',

      // Language Specific - Go
      '*.exe',
      '*.exe~',
      '*.test',
      '*.out',
      'go.work',

      // Language Specific - Rust
      'debug/*',
      '**/*.rs.bk',
      '*.pdb',
      'Cargo.lock',

      // Language Specific - Ruby
      '*.gem',
      '*.rbc',
      '/.config',
      '/coverage/*',
      '/InstalledFiles',
      '/pkg/*',
      '/spec/reports/*',
      '/spec/examples.txt',
      '/test/tmp/*',
      '/test/version_tmp/*',
      '/tmp/*',
      '.dat*',
      '.repl_history',
      '.byebug_history',
      '.ruby-version',
      '.ruby-gemset',
      '.rvmrc',
      '/vendor/bundle/*',
      '/.bundle/*',

      // Language Specific - PHP
      '/vendor/*',
      'composer.phar',
      '.phpunit.result.cache',
      '.phpunit.cache/*',
      '.php-cs-fixer.cache',
      '.php_cs.cache',
      '.phpstan/*',

      // Framework Specific
      '.meteor/*',
      '.serverless/*',
      'serverless.yml',
      'serverless.yaml',
      '.terraform/*',
      '*.tfstate',
      '*.tfstate.*',
      '*.tfvars',
      '*.tfvars.json',
      '.vagrant/*',
      'Vagrantfile',
      '.pulumi/*',
      'Pulumi.yaml',
      'Pulumi.*.yaml',
      '.sst/*',
      'sst.json',
      'sst.config.ts',

      // Misc Tools & Services
      '.husky/*',
      '.commitlintrc*',
      '.czrc',
      '.releaserc*',
      'release.config.*',
      '.renovaterc*',
      'renovate.json',
      '.whitesource',
      '.snyk',
      'apollo.config.*',
      '.graphqlrc*',
      '.graphqlconfig*',
      '.flowconfig',
      '.watchmanconfig',
      '.metro-health-check*',
      '.expo/*',
      '.expo-shared/*',
      'expo-env.d.ts',

      // Security Tools
      '.security/*',
      'security/*',
      '.audit/*',
      'audit/*',

      // Documentation Tools
      'typedoc.json',
      '.typedoc*',
      'jsdoc.json',
      '.jsdoc*',
      'docsify/*',
      '.docsify/*',

      // Claude & AI Specific
      '.claude/*',
      'CLAUDE.md',
      '.claude.json',
      '.ai/*',
      '.openai/*',
      '.anthropic/*',

      // Lock files (catch-all)
      '*.lock',
      '*-lock.*',

      // Hidden directories (common convention)
      '.*/*',

      // Temporary files (catch-all)
      '*.tmp',
      '*.temp',
      '*.bak',
      '*.backup',
      '*.old',
      '*.orig',
      '*.rej',

      // OS generated files
      '.AppleDouble',
      '.LSOverride',
      'Icon[\r\n]',
      '._*',
      '.DocumentRevisions-V100/*',
      '.fseventsd/*',
      '.TemporaryItems/*',
      '.VolumeIcon.icns',
      '.com.apple.timemachine.donotpresent',
      '.apdisk',

      // Windows specific
      '[Tt]humbs.db',
      '[Tt]humbs.db:encryptable',
      '[Dd]esktop.ini',

      // Linux specific
      '*~',
      '.fuse_hidden*',
      '.directory',
      '.Trash-*',
      '.nfs*',
    ].join(',')

    const patterns = this.env.CLAUDE_ORGANIZE_SKIP_PATTERNS || defaultPatterns
    return patterns
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
  }

  ensureLogDirectory(): void {
    const logDir = path.dirname(this.logPath)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
  }
}
