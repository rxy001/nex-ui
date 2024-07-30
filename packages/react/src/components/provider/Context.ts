import { createContext } from '@nex-ui/utils'
import type { NexContext } from './types'

// https://www.gatsbyjs.com/docs/reference/local-development/fast-refresh/#how-it-works
const [NexContextProvider, useNexContext] = createContext<NexContext>({
  contextName: 'NexContext',
  providerName: '<NexProvider />',
  hookName: 'useNexContext',
})

export { NexContextProvider, useNexContext }
