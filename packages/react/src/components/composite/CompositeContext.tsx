import { createContext } from '@nex-ui/utils'
import type { CompositeProps } from './types'

export interface CompositeContextValue {
  orientation: Exclude<CompositeProps['orientation'], undefined>
  loop: boolean
  virtualFocus: boolean
}

export const [CompositeProvider, useCompositeContext] =
  createContext<CompositeContextValue>({
    contextName: 'CompositeContext',
    hookName: 'useCompositeContext',
    providerName: 'CompositeProvider',
    strict: true,
    defaultValue: null as unknown as CompositeContextValue,
  })
