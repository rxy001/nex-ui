'use client'

import { createContext } from '@nex-ui/utils'

export interface DrawerContextValue {
  open: boolean
}

export const [DrawerProvider, useDrawerContext] =
  createContext<DrawerContextValue>({
    contextName: 'DrawerContext',
    hookName: 'useDrawerContext',
    providerName: 'DrawerProvider',
    strict: true,
    defaultValue: null as unknown as DrawerContextValue,
  })
