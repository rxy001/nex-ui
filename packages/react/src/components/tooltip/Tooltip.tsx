'use client'

import { nex } from '@nex-ui/styled'
import { useCallback, useEffect, useId, useMemo } from 'react'
import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { addEventListener, isNumber } from '@nex-ui/utils'
import { Popper, PopperContent, PopperPortal, PopperMotion } from '../popper'
import {
  useSlot,
  useRecipeStyles,
  useSlotClasses,
  useDefaultProps,
} from '../utils'
import { tooltipRecipe } from '../../theme/recipes'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipProvider, useTooltipContext } from './TooltipContext'
import { ScaleFloatingMotion } from '../scaleFloatingMotion'
import type { CSSProperties, ElementType } from 'react'
import type { TooltipProps } from './types'
import type { FocusOutsideEvent } from '../dismissibleLayer'

const slots = ['root', 'paper'] as const

const TOOLTIP_OPEN_EVENT = 'tooltip.open'

const TooltipImpl = (props: TooltipProps) => {
  const { delayOpen, delayClose, rootId } = useTooltipContext()
  const {
    children,
    container,
    content,
    classNames,
    keepMounted,
    slotProps,
    motionProps,
    maxWidth,
    interactive = false,
    disableAnimation = false,
    color = 'default',
    size = 'md',
    radius = 'md',
    placement = 'top',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    size,
    radius,
    color,
    disableAnimation,
    interactive,
    placement,
  }

  const styles = useRecipeStyles({
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
    component: PopperContent,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    additionalProps: {
      onPointerEnter: interactive ? delayOpen : undefined,
      onPointerLeave: interactive ? delayClose : undefined,
      onFocusOutside: (event: FocusOutsideEvent) => {
        event.preventDefault()
      },
      placement,
    },
    ariaProps: {
      role: 'tooltip',
      id: rootId,
    },
    dataAttrs: {
      color,
      size,
      radius,
      interactive,
      disableAnimation,
    },
  })

  const [TooltipPaper, getTooltipPaperProps] = useSlot({
    style: styles.paper,
    component: nex.div,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    additionalProps: {
      style: {
        '--tooltip-max-width': isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
      } as CSSProperties,
    },
  })

  const renderPaper = () => (
    <TooltipPaper {...getTooltipPaperProps()}>{content}</TooltipPaper>
  )

  const renderTooltipRoot = () => (
    <TooltipRoot {...getTooltipRootProps()}>
      {disableAnimation ? (
        renderPaper()
      ) : (
        <ScaleFloatingMotion motionProps={motionProps} placement={placement}>
          {renderPaper()}
        </ScaleFloatingMotion>
      )}
    </TooltipRoot>
  )

  return (
    <>
      <TooltipTrigger>{children}</TooltipTrigger>
      <PopperPortal
        disableAnimatePresence={disableAnimation}
        container={container}
        keepMounted={keepMounted}
      >
        {disableAnimation ? (
          renderTooltipRoot()
        ) : (
          <PopperMotion>{renderTooltipRoot()}</PopperMotion>
        )}
      </PopperPortal>
    </>
  )
}

TooltipImpl.displayName = 'TooltipImpl'

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

  const ariaId = useId()
  const rootId = `tooltip-${ariaId}-root`

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
        debouncedClosePopper.cancel()
        setOpen(false)
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
