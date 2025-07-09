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
  defaultValue: {
    open: false,
    setOpen: () => {},
    maxWidth: 'md',
    keepMounted: false,
    closeOnInteractBackdrop: true,
    preventScroll: false,
    scroll: 'outside',
    placement: 'top',
    hideCloseButton: false,
    fullScreen: false,
    hideBackdrop: false,
    closeOnEscape: true,
  },
})
