'use client'

import { useDefaultProps } from '../utils'
import { Modal, useModal } from '../modal'
import { DialogProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { DialogProps, DialogOwnerState } from './types'

const Provider = (props: DialogProps) => {
  const { children, hideBackdrop = false } = props
  const {
    open,
    preventScroll,
    keepMounted,
    restoreFocus,
    defaultOpen,
    closeOnEscape,
    closeOnInteractOutside,
    setOpen,
  } = useModal()

  const ownerState: DialogOwnerState = {
    ...props,
    closeOnEscape,
    hideBackdrop,
    preventScroll,
    open,
    setOpen,
    keepMounted,
    restoreFocus,
    defaultOpen,
    closeOnInteractBackdrop: closeOnInteractOutside,
  }

  return <DialogProvider value={ownerState}>{children}</DialogProvider>
}

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
    hideBackdrop,
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
      closeOnInteractOutside={!hideBackdrop && closeOnInteractBackdrop}
    >
      <Provider hideBackdrop={hideBackdrop} {...remainingProps}>
        {children}
      </Provider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
Provider.displayName = 'DialogInnerProvider'
