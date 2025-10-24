'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogProps, DialogContentProps } from './types'

type DialogContextValue = Omit<
  DialogProps,
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

export const [DialogProvider, useDialog] = createContext<DialogContextValue>({
  contextName: 'DialogContext',
  hookName: 'useDialog',
  providerName: 'DialogProvider',
  strict: true,
  defaultValue: null as unknown as DialogContextValue,
})

export const [DialogContentProvider, useDialogContent] =
  createContext<DialogContentProps>({
    contextName: 'DialogContentContext',
    hookName: 'useDialogContent',
    providerName: 'DialogContentProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentProps,
  })
