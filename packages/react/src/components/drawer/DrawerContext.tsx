'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerOwnerState } from './types'

interface DrawerContextValue extends DrawerOwnerState {}

export const [DrawerProvider, useDrawer] = createContext<DrawerContextValue>({
  contextName: 'DrawerContext',
  hookName: 'useDrawer',
  providerName: 'DrawerProvider',
  strict: true,
  defaultValue: null as unknown as DrawerContextValue,
})
