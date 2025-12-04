'use client'

import { createContext } from '@nex-ui/utils'
import type { ModalPortalProps } from './types'
import type { RefObject } from 'react'

interface ModalContextValue {
  open: boolean
  closeOnInteractOutside: boolean
  setOpen: (open: boolean) => void
  preventScroll: boolean
  closeOnEscape: boolean
  restoreFocus: boolean
  modalContentId: string
  modalHeaderId: string
  modalBodyId: string
  modalId: string
  modalContentRef: RefObject<HTMLElement | null>
  container?: ModalPortalProps['container']
  keepMounted?: boolean
  disableAnimation?: boolean
}

export const [ModalProvider, useModal] = createContext<ModalContextValue>({
  contextName: 'ModalPropsContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: null as unknown as ModalContextValue,
})
