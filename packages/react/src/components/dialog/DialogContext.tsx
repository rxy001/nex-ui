'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogProps, DialogContentProps } from './types'

export type DialogPropsContextValue = Omit<
  DialogProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DialogPropsProvider, useDialogPropsContext] =
  createContext<DialogPropsContextValue>({
    contextName: 'DialogPropsContext',
    hookName: 'useDialogPropsContext',
    providerName: 'DialogPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogPropsContextValue,
  })

export interface DialogContentPropsContextValue {
  scroll: DialogContentProps['scroll']
}

export const [DialogContentPropsProvider, useDialogContentPropsContext] =
  createContext<DialogContentPropsContextValue>({
    contextName: 'DialogContentPropsContext',
    hookName: 'useDialogContentPropsContext',
    providerName: 'DialogContentPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentPropsContextValue,
  })
