import type { ColorSchemeProviderProps } from '../colorScheme'
import type { SystemConfig } from '../system'

export interface SystemProviderProps
  extends ColorSchemeProviderProps,
    SystemConfig {}
