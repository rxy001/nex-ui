'use client'

import { useId } from 'react'
import { Popper } from '../popper'
import { useDefaultProps } from '../utils'
import { PopoverPropsProvider } from './PopoverContext'
import type { ElementType } from 'react'
import type { PopoverProps } from './types'

export const Popover = <RootComponent extends ElementType = 'div'>(
  inProps: PopoverProps<RootComponent>,
) => {
  const props = useDefaultProps<PopoverProps>({
    name: 'Popover',
    props: inProps,
  })

  const id = useId()

  const {
    children,
    open,
    defaultOpen,
    onOpenChange,
    openDelay = 0,
    closeDelay = 0,
    id: idProp,
    ...remainingProps
  } = props

  const rootId = idProp ?? `popover-${id}-root`

  const ctx = {
    id: rootId,
    ...remainingProps,
  }

  return (
    <Popper
      open={open}
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPropsProvider value={ctx}>{children}</PopoverPropsProvider>
    </Popper>
  )
}

Popover.displayName = 'Popover'
