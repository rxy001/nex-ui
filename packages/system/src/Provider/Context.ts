import { createContext } from '@nex-ui/utils'
import type { CvaFn } from '../styles'
import type { CssFn } from '../css'

const DEFAULT_CONTEXT_VALUE = '__css-system-default-context-value__'

export type SystemContext = { cva: CvaFn; css: CssFn }

const [SystemProvider, useCSSSystem] = createContext<SystemContext>({
  contextName: 'SystemContext',
  providerName: '<SystemProvider />',
  hookName: 'useCSSSystem',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as SystemContext,
})

export { SystemProvider, useCSSSystem, DEFAULT_CONTEXT_VALUE }
