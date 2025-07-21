'use client'

import { useDefaultProps } from '../utils'
import { Modal, useModal } from '../modal'
import { DialogProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogProps } from './types'

const Provider = (props: DialogProps) => {
  const {
    children,
    fullScreen = false,
    placement = 'top',
    hideCloseButton = false,
    maxWidth = 'md',
    scroll = 'outside',
    hideBackdrop = false,
  } = props
  const {
    open,
    preventScroll,
    keepMounted,
    defaultOpen,
    closeOnEscape,
    closeOnInteractOutside,
    setOpen,
  } = useModal()

  const ownerState = {
    ...props,
    closeOnEscape,
    hideBackdrop,
    fullScreen,
    preventScroll,
    scroll,
    maxWidth,
    open,
    setOpen,
    placement,
    keepMounted,
    defaultOpen,
    hideCloseButton,
    closeOnInteractBackdrop: closeOnInteractOutside,
  }

  return <DialogProvider value={ownerState}>{children}</DialogProvider>
}

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
    keepMounted,
    closeOnEscape,
    closeOnInteractBackdrop,
    preventScroll,
    'aria-describedby': describedby,
    'aria-labelledby': labelledby,
    ...remainingProps
  } = props

  return (
    <Modal
      open={open}
      restoreFocus={restoreFocus}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      keepMounted={keepMounted}
      closeOnInteractOutside={closeOnInteractBackdrop}
      preventScroll={preventScroll}
      closeOnEscape={closeOnEscape}
      aria-describedby={describedby}
      aria-labelledby={labelledby}
    >
      <Provider {...remainingProps}>{children}</Provider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
Provider.displayName = 'InnerProvider'
