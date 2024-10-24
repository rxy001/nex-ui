import { createContext } from '@nex-ui/utils'
import type { CvaFn, SvaFn } from '../styles'
import type { CssFn } from '../css'

const DEFAULT_CONTEXT_VALUE = '__css-system-default-context-value__'

export type SystemContext = { cva: CvaFn; css: CssFn; sva: SvaFn }

const [InnerSystemProvider, useSystem] = createContext<SystemContext>({
  contextName: 'SystemContext',
  providerName: 'InnerSystemProvider',
  hookName: 'useSystem',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as SystemContext,
})

export { InnerSystemProvider, useSystem, DEFAULT_CONTEXT_VALUE }
