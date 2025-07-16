import { OrganizationResult } from '../contracts/types/OrganizationResult'
import {
  HookDataSchema,
  HookData,
  ToolOperationSchema,
  ToolOperation,
} from '../contracts/schemas/hookSchemas'
import { Config } from '../config/Config'

export interface ProcessHookDataDeps {
  config: Config
  organizer: (
    operation: ToolOperation,
    config: Config
  ) => Promise<OrganizationResult>
}

export const defaultResult: OrganizationResult = {
  decision: undefined,
  reason: 'Not a supported operation',
}

export async function processHookData(
  inputData: string,
  deps: ProcessHookDataDeps
): Promise<OrganizationResult> {
  // Debug logging to understand JS file processing
  console.error('[HOOK-START] processHookData called')
  console.error('[HOOK-START] CWD:', process.cwd())
  console.error('[HOOK-START] Input data:', inputData)

  try {
    const parsedData = JSON.parse(inputData)

    const hookResult = HookDataSchema.safeParse(parsedData)
    if (!hookResult.success) {
      return defaultResult
    }

    const operation = extractToolOperation(hookResult.data)
    if (!operation) {
      return defaultResult
    }

    // Check if it's a supported file type
    const filePath = operation.tool_input.file_path
    console.error('[HOOK-FILE] Processing file:', filePath)

    const supportedExtensions = ['.md', '.sh', '.js', '.mjs']
    const hasValidExtension = supportedExtensions.some((ext) =>
      filePath?.endsWith(ext)
    )

    console.error('[HOOK-FILE] Has valid extension:', hasValidExtension)
    console.error(
      '[HOOK-FILE] File extension:',
      filePath ? filePath.split('.').pop() : 'none'
    )

    if (!filePath || !hasValidExtension) {
      console.error('[HOOK-FILE] Skipping - not supported file type')
      return {
        decision: undefined,
        reason: 'Not a supported file type',
      }
    }

    console.error('[HOOK-FILE] Calling organizer for:', filePath)
    // Organize the file
    const result = await deps.organizer(operation, deps.config)
    console.error('[HOOK-FILE] Organizer result:', result)
    return result
  } catch (error) {
    return {
      decision: undefined,
      reason: `Hook error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

function extractToolOperation(hook: HookData): ToolOperation | null {
  const result = ToolOperationSchema.safeParse(hook)
  return result.success ? result.data : null
}
