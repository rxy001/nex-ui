'use client'

import { useId, useMemo } from 'react'
import {
  Popper,
  PopperContent,
  PopperMotion,
  PopperPortal,
  PopperRoot,
  usePopper,
} from '../popper'
import { useSlot, useStyles, useSlotClasses, useDefaultProps } from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
import { TooltipTrigger as TooltipTriggerImpl } from './TooltipTrigger'
import type { ElementType } from 'react'
import type { TooltipProps } from './types'

const slots = ['root', 'content']

const useSlotAriaProps = (ownerState: TooltipProps) => {
  const id = useId()

  const rootId = ownerState.id ?? `tooltip-${id}-root`

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

// eslint-disable-next-line react/display-name
const TooltipImpl = (props: TooltipProps) => {
  const { delayOpen, delayClose, setOpen } = usePopper()
  const {
    children,
    container,
    content,
    classNames,
    keepMounted,
    slotProps,
    motionProps,
    maxHeight,
    interactive = true,
    disableAnimation = false,
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
    disableAnimation,
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
    elementType: TooltipTriggerImpl,
    shouldForwardComponent: false,
    additionalProps: slotAriaProps.trigger,
  })

  const [TooltipRoot, getTooltipRootProps] = useSlot({
    style: styles.root,
    elementType: PopperRoot,
    classNames: slotClasses.root,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      onMouseEnter: interactive ? delayOpen : undefined,
      onMouseLeave: interactive ? delayClose : undefined,
      onPointerDownOutside: () => {
        setOpen(false)
      },
    },
    dataAttrs: {
      color,
      size,
      radius,
      interactive,
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

  const renderChildren = () => (
    <TooltipContent {...getTooltipContentProps()}>{content}</TooltipContent>
  )

  return (
    <>
      <TooltipTrigger {...getTooltipTriggerProps()}>{children}</TooltipTrigger>
      <PopperPortal
        disableAnimation={disableAnimation}
        container={container}
        keepMounted={keepMounted}
      >
        <TooltipRoot {...getTooltipRootProps()}>
          {disableAnimation ? (
            renderChildren()
          ) : (
            <PopperMotion {...motionProps}>{renderChildren()}</PopperMotion>
          )}
        </TooltipRoot>
      </PopperPortal>
    </>
  )
}

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
      <TooltipImpl content={content} {...remainingProps}>
        {children}
      </TooltipImpl>
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'
