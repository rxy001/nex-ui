'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogOwnerState, DialogContentOwnerState } from './types'

interface DialogContextValue extends DialogOwnerState {}

export const [DialogProvider, useDialog] = createContext<DialogContextValue>({
  contextName: 'DialogContext',
  hookName: 'useDialog',
  providerName: 'DialogProvider',
  strict: true,
  defaultValue: null as unknown as DialogContextValue,
})

interface DialogContentContextValue extends DialogContentOwnerState {}

export const [DialogContentProvider, useDialogContent] =
  createContext<DialogContentContextValue>({
    contextName: 'DialogContentContext',
    hookName: 'useDialogContent',
    providerName: 'DialogContentProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentContextValue,
  })
