import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { documentOrganizer } from '../src/organizer/documentOrganizer'
import { Config } from '../src/config/Config'
import { ToolOperation } from '../src/contracts/schemas/hookSchemas'
import * as fs from 'fs/promises'
import { ModelClientProvider } from '../src/providers/ModelClientProvider'

vi.mock('fs/promises')
vi.mock('../src/providers/ModelClientProvider', () => ({
  ModelClientProvider: vi.fn().mockImplementation(() => ({
    getModelClient: vi.fn().mockReturnValue({
      ask: vi.fn().mockResolvedValue('{"category": "general", "confidence": 0.5, "reasoning": "Test"}')
    })
  }))
}))

describe('documentOrganizer', () => {
  let config: Config
  let mockOperation: ToolOperation

  beforeEach(() => {
    vi.clearAllMocks()
    config = new Config()
    mockOperation = {
      tool_name: 'Write',
      tool_input: {
        file_path: '/test/example.md',
        content: '# Test Document\n\nThis is a test.'
      },
      tool_output: {},
      tool_error: null
    }
    
    // Default mock implementations
    vi.mocked(fs.readFile).mockResolvedValue('# Test content')
    vi.mocked(fs.mkdir).mockResolvedValue(undefined)
    vi.mocked(fs.rename).mockResolvedValue(undefined)
    vi.mocked(fs.writeFile).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('bypass mode', () => {
    it('should skip organization when bypass is enabled', async () => {
      vi.spyOn(config, 'bypassEnabled', 'get').mockReturnValue(true)
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('Organization bypassed via CLAUDE_ORGANIZE_BYPASS')
    })
  })

  describe('skip patterns', () => {
    it('should skip files matching skip patterns', async () => {
      mockOperation.tool_input.file_path = '/test/README.md'
      vi.spyOn(config, 'skipPatterns', 'get').mockReturnValue(['README.md'])
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('File README.md matches skip pattern')
    })

    it('should skip files in .claude directory', async () => {
      mockOperation.tool_input.file_path = '/test/.claude/settings.json'
      vi.spyOn(config, 'skipPatterns', 'get').mockReturnValue(['.claude/*'])
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('File settings.json matches skip pattern')
    })
  })

  describe('file organization', () => {
    it('should skip files already in docs directory', async () => {
      mockOperation.tool_input.file_path = '/test/docs/existing.md'
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('File already organized')
    })

    it('should handle file system errors gracefully', async () => {
      const enoentError = new Error('ENOENT: no such file or directory')
      ;(enoentError as any).code = 'ENOENT'
      // Mock successful read but failed rename (file was deleted between read and rename)
      vi.mocked(fs.readFile).mockResolvedValue('# Test content')
      vi.mocked(fs.rename).mockRejectedValue(enoentError)
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('File not found - may still be writing')
    })
  })
})