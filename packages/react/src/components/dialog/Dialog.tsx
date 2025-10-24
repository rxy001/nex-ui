'use client'

import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DialogProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { DialogProps } from './types'

export const Dialog = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: DialogProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogProps>({
    name: 'Dialog',
    props: inProps,
  })

  const {
    open,
    children,
    restoreFocus,
    onOpenChange,
    defaultOpen,
    container,
    keepMounted,
    closeOnEscape,
    closeOnInteractBackdrop,
    preventScroll,
    onClose,
    hideBackdrop = false,
    ...remainingProps
  } = props

  return (
    <Modal
      open={open}
      container={container}
      restoreFocus={restoreFocus}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      keepMounted={keepMounted}
      preventScroll={preventScroll}
      closeOnEscape={closeOnEscape}
      onClose={onClose}
      closeOnInteractOutside={!hideBackdrop && closeOnInteractBackdrop}
    >
      <DialogProvider
        value={{
          hideBackdrop,
          ...remainingProps,
        }}
      >
        {children}
      </DialogProvider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
