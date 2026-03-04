'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import type { DrawerProps } from './types'

export const Drawer = (inProps: DrawerProps) => {
  const props = useDefaultProps<DrawerProps>({
    name: 'Drawer',
    props: inProps,
  })

  const { children, onOpenChange, defaultOpen, onClose, open: openProp } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  return (
    <Modal open={open} onOpenChange={setOpen} onClose={onClose}>
      {children}
    </Modal>
  )
}

Drawer.displayName = 'Drawer'
