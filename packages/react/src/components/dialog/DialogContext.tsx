'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogProps, DialogContentProps } from './types'

type DialogRootPropsContextValue = Omit<
  DialogProps,
  'open' | 'children' | 'onOpenChange' | 'defaultOpen' | 'onClose'
>

export const [DialogRootPropsProvider, useDialogRootProps] =
  createContext<DialogRootPropsContextValue>({
    contextName: 'DialogRootPropsContext',
    hookName: 'useDialogRootProps',
    providerName: 'DialogRootPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogRootPropsContextValue,
  })

export const [DialogContentPropsProvider, useDialogContentProps] =
  createContext<DialogContentProps>({
    contextName: 'DialogContentPropsContext',
    hookName: 'useDialogContentProps',
    providerName: 'DialogContentPropsProvider',
    strict: true,
    defaultValue: null as unknown as DialogContentProps,
  })
