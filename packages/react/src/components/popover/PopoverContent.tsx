'use client'

import { nex } from '@nex-ui/styled'
import { isNumber } from '@nex-ui/utils'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { FocusTrap } from '../focusTrap'
import { popoverContentRecipe } from '../../theme/recipes'
import { usePopoverContext } from './PopoverContext'
import { PopperContent, PopperMotion, PopperPortal } from '../popper'
import { ScaleFloatingMotion } from '../scaleFloatingMotion'
import type { CSSProperties, ElementType } from 'react'
import type { PopoverContentProps } from './types'
import type { PointerDownOutsideEvent } from '../dismissibleLayer'

const slots = ['root', 'paper'] as const

export const PopoverContent = <RootComponent extends ElementType = 'div'>(
  inProps: PopoverContentProps<RootComponent>,
) => {
  const props = useDefaultProps<PopoverContentProps>({
    name: 'PopoverContent',
    props: inProps,
  })

  const { open, rootId, triggerRef } = usePopoverContext()
  const {
    children,
    disableAnimation,
    autoFocus,
    restoreFocus,
    container,
    keepMounted,
    motionProps,
    placement,
    slotProps,
    classNames,
    width,
    maxWidth,
    loopFocus = true,
    color = 'default',
    radius = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    color,
    radius,
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

  const [PopoverContentRoot, getPopoverContentRootProps] = useSlot({
    style: styles.root,
    component: PopperContent,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      color,
      radius,
      disableAnimation,
    },
    ariaProps: {
      id: rootId,
      role: 'dialog',
    },
    additionalProps: {
      placement,
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.target as HTMLElement
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
      style: {
        '--popover-max-width': isNumber(maxWidth) ? `${maxWidth}px` : maxWidth,
        '--popover-width': isNumber(width) ? `${width}px` : width,
      } as CSSProperties,
    },
  })

  const renderPaper = () => (
    <PopoverContentPaper {...getPopoverContentPaperProps()}>
      {children}
    </PopoverContentPaper>
  )

  const renderContent = () => (
    <FocusTrap
      loop={loopFocus}
      restoreFocus={restoreFocus}
      active={open}
      autoFocus={autoFocus}
    >
      <PopoverContentRoot {...getPopoverContentRootProps()}>
        {disableAnimation ? (
          renderPaper()
        ) : (
          <ScaleFloatingMotion motionProps={motionProps} placement={placement}>
            {renderPaper()}
          </ScaleFloatingMotion>
        )}
      </PopoverContentRoot>
    </FocusTrap>
  )

  return (
    <PopperPortal
      container={container}
      keepMounted={keepMounted}
      disablePresence={disableAnimation}
    >
      {disableAnimation ? (
        renderContent()
      ) : (
        <PopperMotion>{renderContent()}</PopperMotion>
      )}
    </PopperPortal>
  )
}

PopoverContent.displayName = 'PopoverContent'
