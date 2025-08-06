'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import type { ModalProps } from './types'

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - Dialog
 * - Drawer
 */

export const Modal = (props: ModalProps) => {
  const {
    children,
    container,
    onClose,
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

  const prevOpenRef = useRef(open)

  const rootProps = useMemo(
    () => ({
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
    }),
    [
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
    ],
  )

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      onClose?.()
    }
    prevOpenRef.current = open
  }, [onClose, open])

  return <ModalProvider value={rootProps}>{children}</ModalProvider>
}

Modal.displayName = 'Modal'
