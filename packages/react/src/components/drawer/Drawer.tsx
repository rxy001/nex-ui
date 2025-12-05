'use client'

import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DrawerRootPropsProvider } from './DrawerContext'
import type { ElementType } from 'react'
import type { DrawerProps } from './types'

export const Drawer = <RootComponent extends ElementType = 'div'>(
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
      defaultOpen={defaultOpen}
      restoreFocus={restoreFocus}
      onOpenChange={onOpenChange}
      preventScroll={preventScroll}
      closeOnEscape={closeOnEscape}
      onClose={onClose}
      closeOnInteractOutside={!hideBackdrop && closeOnInteractBackdrop}
    >
      <DrawerRootPropsProvider value={ctx}>{children}</DrawerRootPropsProvider>
    </Modal>
  )
}

Drawer.displayName = 'Drawer'
