'use client'

import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DialogProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogProps } from './types'

export const Dialog = <RootComponent extends ElementType = 'div'>(
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
    closeOnEscape,
    closeOnInteractBackdrop,
    preventScroll,
    onClose,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const ctx = {
    ...remainingProps,
    hideBackdrop,
  }

  return (
    <Modal
      open={open}
      restoreFocus={restoreFocus}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      preventScroll={preventScroll}
      closeOnEscape={closeOnEscape}
      onClose={onClose}
      closeOnInteractOutside={!hideBackdrop && closeOnInteractBackdrop}
    >
      <DialogProvider value={ctx}>{children}</DialogProvider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
