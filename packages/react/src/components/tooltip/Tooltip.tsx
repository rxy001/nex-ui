'use client'

import { useId, useMemo } from 'react'
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
  const id = useId()

  const rootId = ownerState.id ?? `nui-tooltip-${id}`

  const { open } = usePopper()

  const { role = 'tooltip' } = ownerState

  return useMemo(() => {
    return {
      root: {
        role,
        id: rootId,
      },
      trigger: {
        'aria-describedby': open ? rootId : undefined,
      },
    }
  }, [open, rootId, role])
}

const TooltipRoot = (props: TooltipProps) => {
  const {
    children,
    content,
    classNames,
    slotProps,
    motionProps,
    interactive,
    closeOnClick,
    maxHeight,
    maxWidth = 360,
    color = 'default',
    size = 'md',
    radius = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
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
    externalForwardedProps: {
      maxWidth,
      maxHeight,
    },
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
