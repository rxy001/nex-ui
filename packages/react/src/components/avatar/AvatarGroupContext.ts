import { createContext } from '@nex-ui/utils'
import type { AvatarGroupContextValue } from './types'

export const [AvatarGroupProvider, useAvatarGroup] =
  createContext<AvatarGroupContextValue | null>({
    contextName: 'AvatarGroupContext',
    providerName: 'AvatarGroupProvider',
    hookName: 'useAvatarGroup',
    strict: false,
    defaultValue: null,
  })
