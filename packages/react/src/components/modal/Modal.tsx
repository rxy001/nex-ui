'use client'

import { useEffect, useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import type { ModalProps } from './types'
import type { ModalContextValue } from './ModalContext'

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - Dialog
 * - Drawer
 */

export const Modal = (props: ModalProps) => {
  const id = useId()

  const modalContentId = `modal-${id}-content`
  const modalHeaderId = `modal-${id}-header`
  const modalBodyId = `modal-${id}-body`
  const modalId = `modal-${id}`

  const modalContentRef = useRef<HTMLElement | null>(null)

  const {
    children,
    onClose,
    onOpenChange,
    open: openProp,
    defaultOpen = false,
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

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      onClose?.()
    }
    prevOpenRef.current = open
  }, [onClose, open])

  return <ModalProvider value={modalContextValue}>{children}</ModalProvider>
}

Modal.displayName = 'Modal'
