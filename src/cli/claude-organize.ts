#!/usr/bin/env node

import 'dotenv/config'
import { processHookData } from '../hooks/processHookData'
import { documentOrganizer } from '../organizer/documentOrganizer'
import { OrganizationResult } from '../contracts/types/OrganizationResult'
import { Config } from '../config/Config'

export async function run(
  input: string,
  config?: Config
): Promise<OrganizationResult> {
  const appConfig = config ?? new Config()
  
  return processHookData(input, {
    config: appConfig,
    organizer: documentOrganizer,
  })
}

// Only run if this is the main module
if (require.main === module) {
  let inputData = ''
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', (chunk) => {
    inputData += chunk
  })

  process.stdin.on('end', async () => {
    try {
      const result = await run(inputData)
      console.log(JSON.stringify(result))
    } catch (error) {
      console.error('Failed to parse hook data:', error)
    } finally {
      process.exit(0)
    }
  })
}