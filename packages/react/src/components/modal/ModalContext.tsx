'use client'

import { createContext } from '@nex-ui/utils'
import type { ModalPortalProps } from './types'

export interface ModalContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  modalId: string
  modalContentId: string
  modalHeaderId: string
  modalBodyId: string
}

export const [ModalProvider, useModal] = createContext<ModalContextValue>({
  contextName: 'ModalContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: null as unknown as ModalContextValue,
})

export interface ModalPortalPropsContextValue {
  container: ModalPortalProps['container']
  keepMounted: boolean
  disableAnimation: boolean
}

export const [ModalPortalPropsProvider, useModalPortalProps] =
  createContext<ModalPortalPropsContextValue>({
    contextName: 'ModalPortalPropsContext',
    hookName: 'useModalPortalProps',
    providerName: 'ModalPortalPropsProvider',
    strict: true,
    defaultValue: null as unknown as ModalPortalPropsContextValue,
  })
