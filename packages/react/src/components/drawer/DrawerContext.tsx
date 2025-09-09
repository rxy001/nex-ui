'use client'

import { createContext } from '@nex-ui/utils'
import type { DrawerOwnerState } from './types'

export const [DrawerProvider, useDrawer] = createContext<DrawerOwnerState>({
  contextName: 'DrawerContext',
  hookName: 'useDrawer',
  providerName: 'DrawerProvider',
  strict: true,
  defaultValue: null as unknown as DrawerOwnerState,
})
