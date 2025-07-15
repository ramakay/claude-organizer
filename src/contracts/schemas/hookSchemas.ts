import { z } from 'zod'

// Base Hook Context
export const HookContextSchema = z.object({
  session_id: z.string(),
  transcript_path: z.string(),
  hook_event_name: z.string(),
})

export const HookDataSchema = HookContextSchema.extend({
  tool_name: z.string(),
  tool_input: z.unknown(),
})

export type HookData = z.infer<typeof HookDataSchema>

// Tool Input Schemas
export const WriteSchema = z.object({
  file_path: z.string(),
  content: z.string(),
})

export const EditSchema = z.object({
  file_path: z.string(),
  old_string: z.string(),
  new_string: z.string(),
  replace_all: z.boolean().optional(),
})

export const MultiEditSchema = z.object({
  file_path: z.string(),
  edits: z.array(
    z.object({
      old_string: z.string(),
      new_string: z.string(),
      replace_all: z.boolean().optional(),
    })
  ),
})

// Tool Operation Schemas
export const WriteOperationSchema = HookContextSchema.extend({
  tool_name: z.literal('Write'),
  tool_input: WriteSchema,
})

export const EditOperationSchema = HookContextSchema.extend({
  tool_name: z.literal('Edit'),
  tool_input: EditSchema,
})

export const MultiEditOperationSchema = HookContextSchema.extend({
  tool_name: z.literal('MultiEdit'),
  tool_input: MultiEditSchema,
})

export const ToolOperationSchema = z.union([
  WriteOperationSchema,
  EditOperationSchema,
  MultiEditOperationSchema,
])

export type WriteOperation = z.infer<typeof WriteOperationSchema>
export type EditOperation = z.infer<typeof EditOperationSchema>
export type MultiEditOperation = z.infer<typeof MultiEditOperationSchema>
export type ToolOperation = z.infer<typeof ToolOperationSchema>