'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DrawerPropsProvider } from './DrawerContext'
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
    children,
    onOpenChange,
    defaultOpen,
    onClose,
    open: openProp,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const ctx = {
    ...remainingProps,
    hideBackdrop,
  }

  return (
    <Modal open={open} onOpenChange={setOpen} onClose={onClose}>
      <DrawerPropsProvider value={ctx}>{children}</DrawerPropsProvider>
    </Modal>
  )
}

Drawer.displayName = 'Drawer'
