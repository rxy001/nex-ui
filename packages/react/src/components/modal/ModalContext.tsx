'use client'

import { createContext } from '@nex-ui/utils'

interface ModalContextValue {
  open: boolean
  defaultOpen: boolean
  keepMounted: boolean
  closeOnInteractOutside: boolean
  setOpen: (open: boolean) => void
  container?: HTMLElement | null | (() => HTMLElement | null)
  onOpenChange?: (open: boolean) => void
  'aria-labelledby'?: string
  'aria-describedby'?: string
  preventScroll: boolean
  closeOnEscape: boolean
  restoreFocus: boolean
  isTopmostModal?: () => boolean
}

export const [ModalProvider, useModal] = createContext<ModalContextValue>({
  contextName: 'ModalPropsContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: null as unknown as ModalContextValue,
})
