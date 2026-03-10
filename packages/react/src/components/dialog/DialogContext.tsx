'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogContentProps } from './types'

export interface DialogContextValue {
  open: boolean
}

export const [DialogProvider, useDialogContext] =
  createContext<DialogContextValue>({
    contextName: 'DialogContext',
    hookName: 'useDialogContext',
    providerName: 'DialogProvider',
    strict: true,
    defaultValue: null as unknown as DialogContextValue,
  })

export interface DialogContentContextValue {
  scroll: DialogContentProps['scroll']
}

export const [DialogContentProvider, useDialogContentContext] =
  createContext<DialogContentContextValue>({
    contextName: 'DialogContentContext',
    hookName: 'useDialogContentContext',
    providerName: 'DialogContentProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentContextValue,
  })
