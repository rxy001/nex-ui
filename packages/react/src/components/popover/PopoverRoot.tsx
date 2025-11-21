'use client'

import { useMemo } from 'react'
import { PopperMotion, PopperPortal, PopperRoot } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopover } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'
import type { PopoverContextValue } from './PopoverContext'

const slots = ['root']

const useAriaProps = (ownerState: PopoverContextValue) => {
  const { id, 'aria-modal': ariaModal, role = 'dialog' } = ownerState

  return useMemo(
    () => ({
      id,
      role,
      'aria-modal': ariaModal,
    }),
    [ariaModal, id, role],
  )
}

export const PopoverRoot = ({ children }: { children: ReactNode }) => {
  const { motionProps, keepMounted, container, ...props } = usePopover()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

  const style = useStyles({
    ownerState: props,
    name: 'Popover',
    recipe: popoverRecipe,
  })

  const [PopoverRootMotion, getPopoverRootMotionProps] = useSlot({
    elementType: PopperMotion,
    shouldForwardComponent: false,
    externalSlotProps: motionProps,
  })

  const ariaProps = useAriaProps(props)

  const [PopoverRootRoot, getPopoverRootRootProps] = useSlot({
    style,
    elementType: PopperRoot,
    shouldForwardComponent: false,
    externalForwardedProps: props,
    classNames: slotClasses.root,
    a11y: ariaProps,
  })

  return (
    <PopperPortal container={container} keepMounted={keepMounted}>
      <PopoverRootRoot {...getPopoverRootRootProps()}>
        <PopoverRootMotion {...getPopoverRootMotionProps()}>
          {children}
        </PopoverRootMotion>
      </PopoverRootRoot>
    </PopperPortal>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
