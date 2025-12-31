'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogProps, DialogContentProps } from './types'

type DialogPropsContextValue = Omit<
  DialogProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DialogPropsProvider, useDialogProps] =
  createContext<DialogPropsContextValue>({
    contextName: 'DialogPropsContext',
    hookName: 'useDialogProps',
    providerName: 'DialogPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogPropsContextValue,
  })

export const [DialogContentPropsProvider, useDialogContentProps] =
  createContext<DialogContentProps>({
    contextName: 'DialogContentPropsContext',
    hookName: 'useDialogContentProps',
    providerName: 'DialogContentPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentProps,
  })
