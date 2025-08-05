'use client'

import { useDefaultProps } from '../utils'
import { Modal, useModal } from '../modal'
import { DrawerProvider } from './DrawerContext'
import type { DOMMotionComponents } from 'motion/react'
import type { ElementType } from 'react'
import type { DrawerOwnerState, DrawerProps } from './types'

const Provider = (props: DrawerProps) => {
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

  const ownerState: DrawerOwnerState = {
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

  return <DrawerProvider value={ownerState}>{children}</DrawerProvider>
}

export const Drawer = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: DrawerProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerProps>({
    name: 'Drawer',
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

Drawer.displayName = 'Drawer'

Provider.displayName = 'DrawerInnerProvider'
