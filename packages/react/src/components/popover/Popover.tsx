'use client'

import { useId, useMemo } from 'react'
import { Popper } from '../popper'
import { useDefaultProps } from '../utils'
import { PopoverProvider } from './PopoverContext'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { PopoverProps } from './types'

export const Popover = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
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

  const rootId = idProp ?? `nui-popover-${id}`

  const ctx = useMemo(
    () => ({
      id: rootId,
      ...remainingProps,
    }),
    [remainingProps, rootId],
  )

  return (
    <Popper
      open={open}
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverProvider value={ctx}>{children}</PopoverProvider>
    </Popper>
  )
}

Popover.displayName = 'Popover'
