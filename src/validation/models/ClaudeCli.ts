import { IModelClient } from '../../contracts/types/ModelClient'
import { execFileSync } from 'child_process'
import { Config } from '../../config/Config'

export class ClaudeCli implements IModelClient {
  private readonly config: Config

  constructor(config?: Config) {
    this.config = config ?? new Config()
  }

  async ask(prompt: string): Promise<string> {
    try {
      // Use system claude command (like TDD Guard)
      const claudeBinary = 'claude'
      
      // Execute claude command with the prompt
      const response = execFileSync(claudeBinary, [prompt], { 
        encoding: 'utf8',
        timeout: 30000 // 30 second timeout
      })
      
      return response.trim()
    } catch (error) {
      throw new Error(`Claude CLI error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}