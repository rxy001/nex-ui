'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerProps } from './types'

type DrawerRootPropsContextValue = Omit<
  DrawerProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DrawerRootPropsProvider, useDrawerRootProps] =
  createContext<DrawerRootPropsContextValue>({
    contextName: 'DrawerRootPropsContext',
    hookName: 'useDrawerRootProps',
    providerName: 'DrawerRootPropsProvider',
    strict: true,
    defaultValue: null as unknown as DrawerRootPropsContextValue,
  })
