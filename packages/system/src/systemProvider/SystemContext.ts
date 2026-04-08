'use client'

import { createContext } from '@nex-ui/utils'
import type { CssFn } from '../css'
import type { Layers } from '../layers'

const DEFAULT_CONTEXT_VALUE = '__nex-system-default-context-value__'

export interface SystemContextValue {
  css: CssFn
  layers: Layers
  isSystemCSSProperty: (property: string) => boolean
}

const [InnerSystemProvider, useSystem] = createContext<SystemContextValue>({
  contextName: 'SystemContext',
  providerName: 'InnerSystemProvider',
  hookName: 'useSystem',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as SystemContextValue,
})

export { InnerSystemProvider, useSystem }
