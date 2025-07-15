import { OrganizationResult } from '../contracts/types/OrganizationResult'
import { 
  HookDataSchema, 
  HookData,
  ToolOperationSchema,
  ToolOperation 
} from '../contracts/schemas/hookSchemas'
import { Config } from '../config/Config'

export interface ProcessHookDataDeps {
  config: Config
  organizer: (operation: ToolOperation, config: Config) => Promise<OrganizationResult>
}

export const defaultResult: OrganizationResult = {
  decision: undefined,
  reason: 'Not a supported operation',
}

export async function processHookData(
  inputData: string,
  deps: ProcessHookDataDeps
): Promise<OrganizationResult> {
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

    // Check if it's a supported file type (.md or .sh)
    const filePath = operation.tool_input.file_path
    if (!filePath || (!filePath.endsWith('.md') && !filePath.endsWith('.sh'))) {
      return {
        decision: undefined,
        reason: 'Not a supported file type',
      }
    }

    // Organize the file
    return await deps.organizer(operation, deps.config)
    
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