'use client'

import { Popper } from '../popper'
import { useDefaultProps } from '../utils'
import { TooltipBase } from './TooltipBase'
import type { ElementType } from 'react'
import type { TooltipProps } from './types'

export const Tooltip = <RootComponent extends ElementType = 'div'>(
  inProps: TooltipProps<RootComponent>,
) => {
  const props = useDefaultProps<TooltipProps>({
    name: 'Tooltip',
    props: inProps,
  })

  const {
    open,
    openDelay,
    closeDelay,
    defaultOpen,
    onOpenChange,
    children,
    content,
    ...remainingProps
  } = props

  if (content == null || content === '') {
    return children
  }

  return (
    <Popper
      open={open}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
    >
      <TooltipBase content={content} {...remainingProps}>
        {children}
      </TooltipBase>
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'
