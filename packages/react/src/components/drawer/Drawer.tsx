'use client'

import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DrawerProvider } from './DrawerContext'
import type { DrawerProps } from './types'
import type { DrawerContextValue } from './DrawerContext'

export function Drawer(inProps: DrawerProps) {
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

  const ctx = useMemo<DrawerContextValue>(() => ({ open }), [open])

  return (
    <Modal open={open} onOpenChange={setOpen} onClose={onClose}>
      <DrawerProvider value={ctx}>{children}</DrawerProvider>
    </Modal>
  )
}

Drawer.displayName = 'Drawer'
