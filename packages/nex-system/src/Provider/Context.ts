import { createContext } from '@nex-ui/utils'
import type { StylesFn } from '../styles'
import type { NormalizeFn } from '../types'

type SystemContext = { styles: StylesFn; normalize: NormalizeFn }

const [SystemProvider, useCSSSystem] = createContext<SystemContext>({
  contextName: 'SystemContext',
  providerName: '<SystemProvider />',
  hookName: 'useCSSSystem',
})

export { SystemProvider, useCSSSystem }
