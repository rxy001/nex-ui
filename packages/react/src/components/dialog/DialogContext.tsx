'use client'

import { createContext } from '@nex-ui/utils'
import type { DialogContentProps } from './types'

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
