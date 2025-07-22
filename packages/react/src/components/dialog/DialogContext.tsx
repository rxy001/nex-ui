'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogOwnerState } from './types'

interface DialogContextValue extends DialogOwnerState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const [DialogProvider, useDialog] = createContext<DialogContextValue>({
  contextName: 'DialogContext',
  hookName: 'useDialog',
  providerName: 'DialogProvider',
  strict: true,
  defaultValue: null as unknown as DialogContextValue,
})
