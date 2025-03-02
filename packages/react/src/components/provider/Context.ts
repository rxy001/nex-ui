'use client'

import { createContext } from '@nex-ui/utils'
import type { NexContextValue } from './types'

const DEFAULT_CONTEXT_VALUE = '__nex-react-default-context-value__'

// https://www.gatsbyjs.com/docs/reference/local-development/fast-refresh/#how-it-works
const [NexContextProvider, useNexUI] = createContext<NexContextValue>({
  contextName: 'NexContextValue',
  providerName: 'NexContextProvider',
  hookName: 'useNexUI',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as NexContextValue,
})

export { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE }
