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

  ensureLogDirectory(): void {
    const logDir = path.dirname(this.logPath)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
  }
}