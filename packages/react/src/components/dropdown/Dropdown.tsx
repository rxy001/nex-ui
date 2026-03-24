'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { Menu } from '../menu'
import { useDefaultProps } from '../utils'
import { DropdownProvider } from './DropdownContext'
import type { DropdownProps } from './types'

export function Dropdown(inProps: DropdownProps) {
  const props = useDefaultProps<DropdownProps>({
    name: 'Dropdown',
    props: inProps,
  })

  const {
    children,
    onClose,
    defaultOpen = false,
    open: openProp,
    onOpenChange: onOpenChangeProp,
  } = props

  const [open, onOpenChange] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChangeProp,
  )

  const ctx = useMemo(() => ({ open }), [open])

  return (
    <Menu open={open} onOpenChange={onOpenChange} onClose={onClose}>
      <DropdownProvider value={ctx}>{children}</DropdownProvider>
    </Menu>
  )
}

Dropdown.displayName = 'Dropdown'
