'use client'

import { createContext } from '@nex-ui/utils'
import type { AvatarVariants } from '../../theme/recipes'

export interface AvatarGroupContextValue {
  outlined: boolean
  color: AvatarVariants['color']
  radius: AvatarVariants['radius']
  size: AvatarVariants['size']
}

export const [AvatarGroupProvider, useAvatarGroupContext] =
  createContext<AvatarGroupContextValue | null>({
    contextName: 'AvatarGroupContext',
    providerName: 'AvatarGroupProvider',
    hookName: 'useAvatarGroupContext',
    strict: false,
    defaultValue: null,
  })
