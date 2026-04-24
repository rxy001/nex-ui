import { createContext } from '@nex-ui/utils'
import type { CompositeProps } from './types'

export interface CompositeContextValue {
  orientation: Exclude<CompositeProps['orientation'], undefined>
  loop: boolean
  virtualFocus: boolean
  activeId: string
  setActiveId: (id: string) => void
}

export const [CompositeProvider, useCompositeContext] =
  createContext<CompositeContextValue>({
    contextName: 'CompositeContext',
    hookName: 'useCompositeContext',
    providerName: 'CompositeProvider',
    strict: true,
    defaultValue: null as unknown as CompositeContextValue,
  })
