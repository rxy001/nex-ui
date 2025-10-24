'use client'

import {
  Popper,
  PopperContent,
  PopperRoot,
  PopperTrigger,
  usePopper,
} from '../popper'
import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { TooltipProps } from './types'

const slots = ['root', 'content']

const useSlotAriaProps = (ownerState: TooltipProps) => {
  const { open, popperRootId } = usePopper()

  const { role = 'tooltip' } = ownerState

  return {
    root: {
      role,
    },
    trigger: {
      'aria-describedby': open ? popperRootId : undefined,
    },
  }
}

const TooltipRoot = (props: TooltipProps) => {
  const {
    children,
    content,
    classNames,
    slotProps,
    motionProps,
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

  const slotAriaProps = useSlotAriaProps(ownerState)

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

  const [TooltipRootRoot, getTooltipRootRootProps] = useSlot({
    style: styles.root,
    elementType: PopperRoot,
    classNames: slotClasses.root,
    shouldForwardComponent: false,
    externalForwardedProps: {
      placement,
      ...remainingProps,
      ...motionProps,
    },
    dataAttrs: {
      color,
      size,
      radius,
    },
    a11y: slotAriaProps.root,
  })

  const [TooltipRootContent, getTooltipRootContentProps] = useSlot({
    style: styles.content,
    elementType: PopperContent,
    classNames: slotClasses.content,
    shouldForwardComponent: false,
    externalSlotProps: slotProps?.content,
  })

  return (
    <>
      <PopperTrigger
        interactive={interactive}
        closeOnClick={closeOnClick}
        action='hover'
        elementProps={slotAriaProps.trigger}
      >
        {children}
      </PopperTrigger>
      <TooltipRootRoot {...getTooltipRootRootProps()}>
        <TooltipRootContent {...getTooltipRootContentProps()}>
          {content}
        </TooltipRootContent>
      </TooltipRootRoot>
    </>
  )
}

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
    openDelay,
    closeDelay,
    defaultOpen,
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
      <TooltipRoot content={content} {...remainingProps}>
        {children}
      </TooltipRoot>
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'

TooltipRoot.displayName = 'TooltipRoot'
