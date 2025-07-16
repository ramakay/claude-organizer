import { IModelClient } from '../contracts/types/ModelClient'
import { Config } from '../config/Config'
import { ClaudeCli } from '../validation/models/ClaudeCli'

export class ModelClientProvider {
  getModelClient(config?: Config): IModelClient {
    const actualConfig = config ?? new Config()

    // For now, always use ClaudeCli (system claude)
    // This can be extended later to support other model types
    return new ClaudeCli(actualConfig)
  }
}
