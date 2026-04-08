'use client'

import { createContext } from '@nex-ui/utils'
import type { SystemContextValue } from '@nex-ui/system'
import type { Theme } from '../../types/theme'
import type { PrimaryThemeColor } from './types'

export interface NexContextValue extends SystemContextValue {
  prefix: string
  primaryThemeColor: PrimaryThemeColor
  components?: Theme['components']
}

const DEFAULT_CONTEXT_VALUE = '__nex-react-default-context-value__'

const [NexContextProvider, useNexUI] = createContext<NexContextValue>({
  contextName: 'NexContextValue',
  providerName: 'NexContextProvider',
  hookName: 'useNexUI',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as NexContextValue,
})

export { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE }
