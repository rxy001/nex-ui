'use client'

import { createContext } from '@nex-ui/utils'
import type { ModalPortalProps } from './types'

export interface ModalContextValue {
  open?: boolean
  setOpen: (open: boolean) => void
  modalId: string
  modalContentId: string
  modalHeaderId: string
  modalBodyId: string
}

export const [ModalProvider, useModalContext] =
  createContext<ModalContextValue>({
    contextName: 'ModalContext',
    hookName: 'useModalContext',
    providerName: 'ModalProvider',
    strict: true,
    defaultValue: null as unknown as ModalContextValue,
  })

export interface ModalPortalPropsContextValue
  extends Pick<ModalPortalProps, 'container' | 'forceMount'> {}

export const [ModalPortalPropsProvider, useModalPortalPropsContext] =
  createContext<ModalPortalPropsContextValue | null>({
    contextName: 'ModalPortalPropsContext',
    hookName: 'useModalPortalPropsContext',
    providerName: 'ModalPortalPropsProvider',
    strict: false,
    defaultValue: null,
  })
