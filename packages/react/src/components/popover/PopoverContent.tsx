'use client'

import { nex } from '@nex-ui/styled'
import { AnimatePresence, LazyMotion } from 'motion/react'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
  motionFeatures,
  useKeepMountedState,
} from '../utils'
import { FocusTrap } from '../focusTrap'
import { PopoverPaperMotion } from './PopoverPaperMotion'
import { popoverContentRecipe } from '../../themes/recipes'
import { usePopoverContext } from './PopoverContext'
import { PopperContent, PopperPortal } from '../popper'
import type { ElementType } from 'react'
import type { PopoverContentProps } from './types'
import type { PointerDownOutsideEvent } from '../dismissibleLayer'

const slots = ['root', 'paper'] as const

export function PopoverContent<RootComponent extends ElementType = 'div'>(
  inProps: PopoverContentProps<RootComponent>,
) {
  const props = useDefaultProps<PopoverContentProps>({
    name: 'PopoverContent',
    props: inProps,
  })

  const { open, rootId, triggerRef } = usePopoverContext()
  const {
    children,
    autoFocus,
    restoreFocus,
    container,
    keepMounted,
    motionProps,
    slotProps,
    classNames,
    width,
    minWidth,
    maxWidth = 300,
    placement = 'bottom',
    disableAnimation = false,
    loopFocus = true,
    color = 'default',
    radius = 'md',
    size = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    color,
    radius,
    placement,
    disableAnimation,
    loopFocus,
    size,
  }

  const styles = useRecipeStyles({
    ownerState,
    name: 'PopoverContent',
    recipe: popoverContentRecipe,
  })

  const slotClasses = useSlotClasses({
    slots,
    classNames,
    name: 'PopoverContent',
  })

  const { resolvedDisplay, onAnimationComplete, onAnimationStart } =
    useKeepMountedState({
      open,
      keepMounted,
      disableAnimation,
    })

  const [PopoverContentRoot, getPopoverContentRootProps] = useSlot({
    style: styles.root,
    component: PopperContent,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      color,
      radius,
      disableAnimation,
      size,
    },
    ariaProps: {
      id: rootId,
      role: 'dialog',
      'aria-hidden': keepMounted && !open ? 'true' : undefined,
    },
    additionalProps: {
      placement,
      style: {
        display: resolvedDisplay,
      },
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.detail.originalEvent.target as HTMLElement
        if (triggerRef.current?.contains(target)) {
          event.preventDefault()
        }
      },
    },
  })

  const [PopoverContentPaper, getPopoverContentPaperProps] = useSlot({
    style: styles.paper,
    component: nex.div,
    classNames: slotClasses.paper,
    externalSlotProps: slotProps?.paper,
    additionalProps: {
      sx: {
        width,
        minWidth,
        maxWidth,
      },
    },
  })

  const renderPaper = () => (
    <FocusTrap
      loop={loopFocus}
      restoreFocus={restoreFocus}
      active={open}
      autoFocus={autoFocus}
    >
      <PopoverContentPaper {...getPopoverContentPaperProps()}>
        {children}
      </PopoverContentPaper>
    </FocusTrap>
  )

  const renderContent = () => (
    <PopoverContentRoot {...getPopoverContentRootProps()}>
      {disableAnimation ? (
        renderPaper()
      ) : (
        <PopoverPaperMotion
          motionProps={motionProps}
          placement={placement}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
        >
          {renderPaper()}
        </PopoverPaperMotion>
      )}
    </PopoverContentRoot>
  )

  const renderPortal = () =>
    open || keepMounted ? (
      <PopperPortal container={container} forceMount>
        {renderContent()}
      </PopperPortal>
    ) : null

  return disableAnimation ? (
    renderPortal()
  ) : (
    <LazyMotion features={motionFeatures}>
      <AnimatePresence>{renderPortal()}</AnimatePresence>
    </LazyMotion>
  )
}

PopoverContent.displayName = 'PopoverContent'
