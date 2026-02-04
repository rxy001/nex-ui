'use client'

import { useId, useMemo, useRef } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { Popper } from '../popper'
import { useDefaultProps } from '../utils'
import { PopoverPropsProvider, PopoverProvider } from './PopoverContext'
import type { ElementType } from 'react'
import type { PopoverProps } from './types'

export const Popover = <RootComponent extends ElementType = 'div'>(
  inProps: PopoverProps<RootComponent>,
) => {
  const props = useDefaultProps<PopoverProps>({
    name: 'Popover',
    props: inProps,
  })

  const ariaId = useId()

  const triggerRef = useRef<HTMLElement>(null)

  const {
    children,
    onOpenChange,
    onClose,
    open: openProp,
    defaultOpen = false,
    ...remainingProps
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const rootId = `popover-${ariaId}-root`

  const popoverCtx = useMemo(
    () => ({ open, setOpen, triggerRef, rootId }),
    [open, rootId, setOpen],
  )

  return (
    <Popper open={open} onOpenChange={setOpen} onClose={onClose}>
      <PopoverProvider value={popoverCtx}>
        <PopoverPropsProvider value={remainingProps}>
          {children}
        </PopoverPropsProvider>
      </PopoverProvider>
    </Popper>
  )
}

Popover.displayName = 'Popover'
