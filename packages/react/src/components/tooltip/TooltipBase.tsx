'use client'

import { useId, useMemo } from 'react'
import {
  PopperContent,
  PopperMotion,
  PopperPortal,
  PopperRoot,
  PopperTrigger,
  usePopper,
} from '../popper'
import { useSlot, useStyles, useSlotClasses } from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
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

export const TooltipBase = (props: TooltipProps) => {
  const {
    children,
    container,
    content,
    classNames,
    keepMounted,
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
    maxWidth,
    radius,
    color,
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

  const [TooltipTrigger, getTooltipTriggerProps] = useSlot({
    elementType: PopperTrigger,
    shouldForwardComponent: false,
    additionalProps: {
      interactive,
      closeOnClick,
      action: 'hover',
      elementProps: slotAriaProps.trigger,
    },
  })

  const [TooltipMotion, getTooltipMotionProps] = useSlot({
    elementType: PopperMotion,
    shouldForwardComponent: false,
    externalSlotProps: motionProps,
  })

  const [TooltipRoot, getTooltipRootProps] = useSlot({
    style: styles.root,
    elementType: PopperRoot,
    classNames: slotClasses.root,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    dataAttrs: {
      color,
      size,
      radius,
    },
    a11y: slotAriaProps.root,
  })

  const [TooltipContent, getTooltipContentProps] = useSlot({
    style: styles.content,
    elementType: PopperContent,
    classNames: slotClasses.content,
    shouldForwardComponent: false,
    externalSlotProps: slotProps?.content,
    additionalProps: {
      maxWidth,
      maxHeight,
    },
  })

  return (
    <>
      <TooltipTrigger {...getTooltipTriggerProps()}>{children}</TooltipTrigger>
      <PopperPortal container={container} keepMounted={keepMounted}>
        <TooltipRoot {...getTooltipRootProps()}>
          <TooltipMotion {...getTooltipMotionProps()}>
            <TooltipContent {...getTooltipContentProps()}>
              {content}
            </TooltipContent>
          </TooltipMotion>
        </TooltipRoot>
      </PopperPortal>
    </>
  )
}

TooltipBase.displayName = 'TooltipBase'
