import { describe, it, expect, beforeEach, vi } from 'vitest'
import { documentOrganizer } from '../src/organizer/documentOrganizer'
import { Config } from '../src/config/Config'
import { ToolOperation } from '../src/contracts/schemas/hookSchemas'
import * as fs from 'fs/promises'

vi.mock('fs/promises')
vi.mock('../src/providers/ModelClientProvider')

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

    it('should handle non-existent files gracefully', async () => {
      vi.mocked(fs.readFile).mockRejectedValue({ code: 'ENOENT' })
      
      const result = await documentOrganizer(mockOperation, config)
      
      expect(result.decision).toBeUndefined()
      expect(result.reason).toBe('File not found - may still be writing')
    })
  })
})