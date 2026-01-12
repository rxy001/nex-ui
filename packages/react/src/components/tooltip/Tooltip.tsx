'use client'

import { useCallback, useEffect, useId, useMemo } from 'react'
import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { addEventListener } from '@nex-ui/utils'
import {
  Popper,
  PopperContent,
  PopperMotion,
  PopperPortal,
  PopperRoot,
} from '../popper'
import { useSlot, useStyles, useSlotClasses, useDefaultProps } from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipProvider, useTooltipContext } from './TooltipContext'
import type { ElementType } from 'react'
import type { TooltipProps } from './types'

const slots = ['root', 'content']

const TOOLTIP_OPEN_EVENT = 'tooltip.open'

const useSlotAriaProps = (ownerState: TooltipProps) => {
  const { rootId } = useTooltipContext()

  const { role = 'tooltip' } = ownerState

  return useMemo(() => {
    return {
      root: {
        role,
        id: rootId,
      },
    }
  }, [rootId, role])
}

// eslint-disable-next-line react/display-name
const TooltipImpl = (props: TooltipProps) => {
  const { delayOpen, delayClose, setOpen } = useTooltipContext()
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

  const [TooltipRoot, getTooltipRootProps] = useSlot({
    style: styles.root,
    elementType: PopperRoot,
    classNames: slotClasses.root,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      onPointerEnter: interactive ? delayOpen : undefined,
      onPointerLeave: interactive ? delayClose : undefined,
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
      <TooltipTrigger>{children}</TooltipTrigger>
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
    onOpenChange,
    children,
    content,
    onClose,
    open: openProp,
    defaultOpen = false,
    openDelay = 100,
    closeDelay = 100,
    ...remainingProps
  } = props

  const id = useId()
  const rootId = `tooltip-${id}-root`

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    (value: boolean) => {
      onOpenChange?.(value)
      if (value) {
        // Ensure that all updates occur within the same lifecycle.
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN_EVENT))
      }
    },
  )

  const debouncedOpenPopper = useDebounce(
    () => {
      if (!open) setOpen(true)
    },
    {
      wait: openDelay,
    },
  )

  const debouncedClosePopper = useDebounce(
    () => {
      if (open) setOpen(false)
    },
    {
      wait: closeDelay,
    },
  )

  const delayOpen = useCallback(() => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper()
  }, [debouncedClosePopper, debouncedOpenPopper])

  const delayClose = useCallback(() => {
    debouncedOpenPopper.cancel()
    debouncedClosePopper()
  }, [debouncedClosePopper, debouncedOpenPopper])

  const ctx = useMemo(
    () => ({ open, setOpen, delayOpen, delayClose, rootId }),
    [delayClose, delayOpen, open, setOpen, rootId],
  )

  useEffect(() => {
    if (open) {
      return addEventListener(document, TOOLTIP_OPEN_EVENT, () => {
        debouncedClosePopper.flush()
      })
    }
  }, [debouncedClosePopper, open, setOpen])

  useUnmount(() => {
    debouncedClosePopper.cancel()
    debouncedOpenPopper.cancel()
  })

  if (content == null || content === '') {
    return children
  }

  return (
    <Popper open={open} onOpenChange={setOpen} onClose={onClose}>
      <TooltipProvider value={ctx}>
        <TooltipImpl content={content} {...remainingProps}>
          {children}
        </TooltipImpl>
      </TooltipProvider>
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'
