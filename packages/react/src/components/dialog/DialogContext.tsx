'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogOwnerState } from './types'

interface DialogContextValue extends DialogOwnerState {}

export const [DialogProvider, useDialog] = createContext<DialogContextValue>({
  contextName: 'DialogContext',
  hookName: 'useDialog',
  providerName: 'DialogProvider',
  strict: true,
  defaultValue: null as unknown as DialogContextValue,
})
