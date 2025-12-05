'use client'

import { useEffect, useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { ModalPropsProvider, ModalProvider } from './ModalContext'
import { MODAL_INTERNAL_ID_PREFIX } from './constants'
import type { ModalProps } from './types'
import type { ModalContextValue, ModalPropsContextValue } from './ModalContext'

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
  const modalId = `${MODAL_INTERNAL_ID_PREFIX}${id}`

  const modalContentRef = useRef<HTMLElement | null>(null)

  const {
    children,
    onClose,
    onOpenChange,
    open: openProp,
    restoreFocus = true,
    closeOnEscape = true,
    preventScroll = false,
    defaultOpen = false,
    closeOnInteractOutside = true,
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const prevOpenRef = useRef(open)

  const modalContextValue = useMemo<ModalContextValue>(
    () => ({
      open,
      setOpen,
      modalContentId,
      modalHeaderId,
      modalBodyId,
      modalId,
      modalContentRef,
    }),
    [setOpen, open, modalContentId, modalHeaderId, modalBodyId, modalId],
  )

  const modalPropsContentValue = useMemo<ModalPropsContextValue>(
    () => ({
      restoreFocus,
      closeOnEscape,
      closeOnInteractOutside,
      preventScroll,
    }),
    [restoreFocus, closeOnEscape, closeOnInteractOutside, preventScroll],
  )

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      onClose?.()
    }
    prevOpenRef.current = open
  }, [onClose, open])

  return (
    <ModalProvider value={modalContextValue}>
      <ModalPropsProvider value={modalPropsContentValue}>
        {children}
      </ModalPropsProvider>
    </ModalProvider>
  )
}

Modal.displayName = 'Modal'
