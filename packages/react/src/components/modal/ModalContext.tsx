'use client'

import { createContext } from '@nex-ui/utils'
import type { ModalPortalProps } from './types'

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
  container?: ModalPortalProps['container']
  keepMounted?: boolean
  animateDisabled?: boolean
}

export const [ModalProvider, useModal] = createContext<ModalContextValue>({
  contextName: 'ModalPropsContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: null as unknown as ModalContextValue,
})
