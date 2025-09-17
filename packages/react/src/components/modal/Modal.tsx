'use client'

import { useEffect, useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import { MODAL_INTERNAL_ID_PREFIX } from './constants'
import type { ModalProps } from './types'

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - Dialog
 * - Drawer
 */

export const Modal = (props: ModalProps) => {
  const id = useId()

  const modalContentId = `${MODAL_INTERNAL_ID_PREFIX}${id}-content`
  const modalHeaderId = `${MODAL_INTERNAL_ID_PREFIX}${id}-header`
  const modalBodyId = `${MODAL_INTERNAL_ID_PREFIX}${id}-body`

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
      modalContentId,
      modalHeaderId,
      modalBodyId,
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
      modalContentId,
      modalHeaderId,
      modalBodyId,
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
