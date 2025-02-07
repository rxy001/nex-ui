'use client'

import { createContext } from '@nex-ui/utils'
import type { NexContext } from './types'

const DEFAULT_CONTEXT_VALUE = '__nex-react-default-context-value__'

// https://www.gatsbyjs.com/docs/reference/local-development/fast-refresh/#how-it-works
const [NexContextProvider, useNexContext] = createContext<NexContext>({
  contextName: 'NexContext',
  providerName: 'NexProvider',
  hookName: 'useNexContext',
  strict: false,
  defaultValue: DEFAULT_CONTEXT_VALUE as unknown as NexContext,
})

export { NexContextProvider, useNexContext, DEFAULT_CONTEXT_VALUE }
