'use client'

import { useId, useMemo, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import type { ModalProps } from './types'
import type { ModalContextValue } from './ModalContext'

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - Dialog
 * - Drawer
 */

export function Modal(props: ModalProps) {
  const ariaId = useId()
  const modalContentId = `modal-${ariaId}-content`
  const modalHeaderId = `modal-${ariaId}-header`
  const modalBodyId = `modal-${ariaId}-body`
  const modalId = `modal-${ariaId}`
  const { children, onOpenChange, open, onClose } = props

  const previousOpenRef = useRef(open)

  const setOpen = useEvent((value: boolean) => {
    if (previousOpenRef.current && value === false) {
      onClose?.()
    }
    onOpenChange?.(value)
    previousOpenRef.current = value
  })

  const modalContextValue = useMemo<ModalContextValue>(
    () => ({
      open,
      modalContentId,
      modalHeaderId,
      modalBodyId,
      modalId,
      setOpen,
    }),
    [open, setOpen, modalContentId, modalHeaderId, modalBodyId, modalId],
  )

  return <ModalProvider value={modalContextValue}>{children}</ModalProvider>
}

Modal.displayName = 'Modal'
