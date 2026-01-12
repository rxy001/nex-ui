'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerProps } from './types'

type DrawerPropsContextValue = Omit<
  DrawerProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DrawerPropsProvider, useDrawerPropsContext] =
  createContext<DrawerPropsContextValue>({
    contextName: 'DrawerPropsContext',
    hookName: 'useDrawerPropsContext',
    providerName: 'DrawerPropsProvider',
    strict: true,
    defaultValue: null as unknown as DrawerPropsContextValue,
  })
