'use client'

import { createContext } from '@nex-ui/utils'
import type { ModalPortalProps } from './types'
import type { RefObject } from 'react'

export interface ModalContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  modalId: string
  modalContentId: string
  modalHeaderId: string
  modalBodyId: string
  modalContentRef: RefObject<HTMLElement | null>
}

export const [ModalProvider, useModal] = createContext<ModalContextValue>({
  contextName: 'ModalPropsContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: null as unknown as ModalContextValue,
})

export interface ModalPropsContextValue {
  preventScroll: boolean
  closeOnEscape: boolean
  restoreFocus: boolean
  closeOnInteractOutside: boolean
}

export const [ModalPropsProvider, useModalProps] =
  createContext<ModalPropsContextValue>({
    contextName: 'ModalPropsContext',
    hookName: 'useModalProps',
    providerName: 'ModalPropsProvider',
    strict: true,
    defaultValue: null as unknown as ModalPropsContextValue,
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
