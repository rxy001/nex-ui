'use client'

import { useMemo } from 'react'
import { PopperRoot } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopover } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'
import type { PopperRootProps } from '../popper'

const slots = ['root']

const useAriaProps = (ownerState: PopperRootProps) => {
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
  const { motionProps, ...props } = usePopover()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

  const ariaProps = useAriaProps(props)

  const style = useStyles({
    ownerState: props,
    name: 'Popover',
    recipe: popoverRecipe,
  })

  const [PopoverRootRoot, getPopoverRootRootProps] = useSlot({
    style,
    elementType: PopperRoot,
    shouldForwardComponent: false,
    externalForwardedProps: {
      ...props,
      ...motionProps,
    },
    classNames: slotClasses.root,
    a11y: ariaProps,
  })

  return (
    <PopoverRootRoot {...getPopoverRootRootProps()}>{children}</PopoverRootRoot>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
