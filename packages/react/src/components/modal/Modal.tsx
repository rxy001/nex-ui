'use client'

import { useControlledState } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import type { ModalProps } from './types'

export const Modal = (props: ModalProps) => {
  const {
    children,
    container,
    onOpenChange,
    open: openProp,
    restoreFocus = true,
    closeOnEscape = true,
    preventScroll = false,
    defaultOpen = false,
    keepMounted = false,
    closeOnInteractOutside = true,
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const rootProps = {
    setOpen,
    restoreFocus,
    closeOnEscape,
    open,
    keepMounted,
    defaultOpen,
    closeOnInteractOutside,
    onOpenChange,
    preventScroll,
    container,
  }

  return <ModalProvider value={rootProps}>{children}</ModalProvider>
}

Modal.displayName = 'Modal'
