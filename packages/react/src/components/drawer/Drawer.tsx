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
    onOpenChange,
    defaultOpen,
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
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <DrawerRootPropsProvider value={ctx}>{children}</DrawerRootPropsProvider>
    </Modal>
  )
}

Drawer.displayName = 'Drawer'
