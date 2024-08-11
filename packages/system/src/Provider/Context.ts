import { createContext } from '@nex-ui/utils'
import type { StylesFn } from '../styles'
import type { NormalizeFn } from '../types'

const DEFAULT_CONTEXT_VALUE = '__css-system-default-context-value__'

export type SystemContext = { styles: StylesFn; normalize: NormalizeFn }

const [SystemProvider, useCSSSystem] = createContext<SystemContext>({
  contextName: 'SystemContext',
  providerName: '<SystemProvider />',
  hookName: 'useCSSSystem',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as SystemContext,
})

export { SystemProvider, useCSSSystem, DEFAULT_CONTEXT_VALUE }
