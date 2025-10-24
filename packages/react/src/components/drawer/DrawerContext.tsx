'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerProps } from './types'

type DrawerContextValue = Omit<
  DrawerProps,
  | 'open'
  | 'children'
  | 'restoreFocus'
  | 'container'
  | 'onOpenChange'
  | 'defaultOpen'
  | 'keepMounted'
  | 'preventScroll'
  | 'closeOnEscape'
  | 'onClose'
  | 'closeOnInteractBackdrop'
>

export const [DrawerProvider, useDrawer] = createContext<DrawerContextValue>({
  contextName: 'DrawerContext',
  hookName: 'useDrawer',
  providerName: 'DrawerProvider',
  strict: true,
  defaultValue: null as unknown as DrawerContextValue,
})
