'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerProps } from './types'

type DrawerPropsContextValue = Omit<
  DrawerProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DrawerPropsProvider, useDrawerProps] =
  createContext<DrawerPropsContextValue>({
    contextName: 'DrawerPropsContext',
    hookName: 'useDrawerProps',
    providerName: 'DrawerPropsProvider',
    strict: true,
    defaultValue: null as unknown as DrawerPropsContextValue,
  })
