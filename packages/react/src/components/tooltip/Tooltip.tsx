'use client'

import { Popper, PopperContent, PopperRoot, PopperTrigger } from '../popper'
import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { TooltipProps } from './types'

const slots = ['root', 'content']

export const Tooltip = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: TooltipProps<RootComponent>,
) => {
  const props = useDefaultProps<TooltipProps>({
    name: 'Tooltip',
    props: inProps,
  })

  const {
    children,
    content,
    open,
    onOpenChange,
    container,
    classNames,
    slotProps,
    offset,
    openDelay,
    closeDelay,
    shift,
    flip,
    motionProps,
    keepMounted,
    defaultOpen,
    closeOnEscape,
    closeOnClick = true,
    color = 'default',
    interactive = true,
    placement = 'top',
    size = 'md',
    radius = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    placement,
    size,
    radius,
    color,
    interactive,
    closeOnClick,
  }

  const styles = useStyles({
    ownerState,
    name: 'Tooltip',
    recipe: tooltipRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'Tooltip',
    slots,
    classNames,
  })

  const [TooltipWrapper, getTooltipWrapperProps] = useSlot({
    elementType: Popper,
    shouldForwardComponent: false,
    externalForwardedProps: {
      open,
      onOpenChange,
      container,
      offset,
      openDelay,
      closeDelay,
      shift,
      flip,
      keepMounted,
      defaultOpen,
      closeOnEscape,
      placement,
    },
  })

  const [TooltipRoot, getTooltipRootProps] = useSlot({
    style: styles.root,
    elementType: PopperRoot,
    classNames: slotClasses.root,
    shouldForwardComponent: false,
    externalForwardedProps: {
      ...remainingProps,
      ...motionProps,
    },
    dataAttrs: {
      color,
      size,
      radius,
    },
  })

  const [TooltipTrigger, getTooltipTriggerProps] = useSlot({
    elementType: PopperTrigger,
    shouldForwardComponent: false,
    externalForwardedProps: {
      interactive,
      closeOnClick,
      action: 'hover',
    },
  })

  const [TooltipContent, getTooltipContentProps] = useSlot({
    style: styles.content,
    elementType: PopperContent,
    classNames: slotClasses.content,
    shouldForwardComponent: false,
    externalForwardedProps: slotProps?.content,
  })

  if (content == null || content === '') {
    return children
  }

  return (
    <TooltipWrapper {...getTooltipWrapperProps()}>
      <TooltipTrigger {...getTooltipTriggerProps()}>{children}</TooltipTrigger>
      <TooltipRoot {...getTooltipRootProps()}>
        <TooltipContent {...getTooltipContentProps()}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipWrapper>
  )
}

Tooltip.displayName = 'Tooltip'
