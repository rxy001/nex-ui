'use client'

import { createContext } from '@nex-ui/utils'
import type { CssFn } from '../css'

const DEFAULT_CONTEXT_VALUE = '__nex-system-default-context-value__'

export type SystemContext = { css: CssFn }

const [InnerSystemProvider, useSystem] = createContext<SystemContext>({
  contextName: 'SystemContext',
  providerName: 'InnerSystemProvider',
  hookName: 'useSystem',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as SystemContext,
})

export { InnerSystemProvider, useSystem, DEFAULT_CONTEXT_VALUE }
