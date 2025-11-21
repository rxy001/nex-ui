'use client'

import { useEffect, useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { ModalProvider } from './ModalContext'
import { MODAL_INTERNAL_ID_PREFIX } from './constants'
import type { ModalPortalProps, ModalProps } from './types'

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
  const containerRef = useRef<ModalPortalProps['container']>(null)

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

  const rootProps = useMemo(
    () => ({
      setOpen,
      restoreFocus,
      closeOnEscape,
      open,
      closeOnInteractOutside,
      preventScroll,
      modalContentId,
      modalHeaderId,
      modalBodyId,
      modalId,
      containerRef,
    }),
    [
      setOpen,
      restoreFocus,
      closeOnEscape,
      open,
      closeOnInteractOutside,
      preventScroll,
      modalContentId,
      modalHeaderId,
      modalBodyId,
      modalId,
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
