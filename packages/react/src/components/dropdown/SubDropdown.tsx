'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useMemo } from 'react'
import { SubMenu } from '../menu'
import { useDefaultProps } from '../utils'
import { SubDropdownProvider } from './DropdownContext'
import type { SubDropdownProps } from './types'

export const SubDropdown = (inProps: SubDropdownProps) => {
  const props = useDefaultProps<SubDropdownProps>({
    name: 'SubDropdown',
    props: inProps,
  })

  const {
    children,
    defaultOpen,
    onClose,
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
    <SubMenu open={open} onOpenChange={onOpenChange} onClose={onClose}>
      <SubDropdownProvider value={ctx}>{children}</SubDropdownProvider>
    </SubMenu>
  )
}

SubDropdown.displayName = 'SubDropdown'
