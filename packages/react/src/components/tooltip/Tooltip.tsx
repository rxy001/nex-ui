'use client'

import { nex } from '@nex-ui/styled'
import { useCallback, useEffect, useId, useMemo, useRef } from 'react'
import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { addEventListener } from '@nex-ui/utils'
import { AnimatePresence, LazyMotion } from 'motion/react'
import { Popper, PopperContent, PopperPortal } from '../popper'
import {
  useSlot,
  useRecipeStyles,
  useSlotClasses,
  useDefaultProps,
  motionFeatures,
  useKeepMountedState,
} from '../utils'
import { tooltipRecipe } from '../../themes/recipes'
import { TooltipTrigger } from './TooltipTrigger'
import { TooltipProvider, useTooltipContext } from './TooltipContext'
import { TooltipPaperMotion } from './TooltipPaperMotion'
import type { ElementType } from 'react'
import type { TooltipProps } from './types'
import type {
  FocusOutsideEvent,
  PointerDownOutsideEvent,
} from '../dismissibleLayer'

const slots = ['root', 'paper'] as const

const TOOLTIP_OPEN_EVENT = 'tooltip.open'

function TooltipImpl(props: TooltipProps) {
  const { delayOpen, delayClose, rootId, open, triggerRef } =
    useTooltipContext()
  const {
    container,
    content,
    classNames,
    keepMounted,
    slotProps,
    motionProps,
    minWidth,
    width = 'max-content',
    maxWidth = 300,
    interactive = false,
    closeOnClick = true,
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

  const { resolvedDisplay, onAnimationComplete, onAnimationStart } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
    })

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
      placement,
      onPointerEnter: interactive ? delayOpen : undefined,
      onPointerLeave: interactive ? delayClose : undefined,
      onFocusOutside: (event: FocusOutsideEvent) => {
        event.preventDefault()
      },
      style: {
        display: resolvedDisplay,
      },
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.detail.originalEvent.target as HTMLElement
        if (!closeOnClick && triggerRef.current?.contains(target)) {
          event.preventDefault()
        }
      },
    },
    ariaProps: {
      id: rootId,
      role: 'tooltip',
      'aria-hidden': keepMounted && !open ? 'true' : undefined,
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
      sx: {
        maxWidth,
        minWidth,
        width,
      },
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
        <TooltipPaperMotion
          motionProps={{
            initial: 'hidden',
            exit: 'hidden',
            animate: keepMounted ? (open ? 'visible' : 'hidden') : 'visible',
            ...motionProps,
          }}
          placement={placement}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
        >
          {renderPaper()}
        </TooltipPaperMotion>
      )}
    </TooltipRoot>
  )

  const renderPortal = () =>
    open || keepMounted ? (
      <PopperPortal container={container} forceMount>
        {renderTooltipRoot()}
      </PopperPortal>
    ) : null

  return disableAnimation ? (
    renderPortal()
  ) : (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence initial={false}>{renderPortal()}</AnimatePresence>
    </LazyMotion>
  )
}

TooltipImpl.displayName = 'TooltipImpl'

export function Tooltip<RootComponent extends ElementType = 'div'>(
  inProps: TooltipProps<RootComponent>,
) {
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

  const triggerRef = useRef<HTMLElement>(null)

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
    () => ({ open, setOpen, delayOpen, delayClose, rootId, triggerRef }),
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
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipImpl content={content} {...remainingProps} />
      </TooltipProvider>
    </Popper>
  )
}

Tooltip.displayName = 'Tooltip'
