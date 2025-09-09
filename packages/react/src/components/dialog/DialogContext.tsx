'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogOwnerState, DialogContentProps } from './types'

export const [DialogProvider, useDialog] = createContext<DialogOwnerState>({
  contextName: 'DialogContext',
  hookName: 'useDialog',
  providerName: 'DialogProvider',
  strict: true,
  defaultValue: null as unknown as DialogOwnerState,
})

export const [DialogContentProvider, useDialogContent] =
  createContext<DialogContentProps>({
    contextName: 'DialogContentContext',
    hookName: 'useDialogContent',
    providerName: 'DialogContentProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentProps,
  })
