import { PopperRoot } from '../popper'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { usePopover } from './PopoverContext'
import { popoverRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'

const slots = ['root']

export const PopoverRoot = ({ children }: { children: ReactNode }) => {
  const { motionProps, ...props } = usePopover()

  const slotClasses = useSlotClasses({
    name: 'Popover',
    slots,
  })

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
  })

  return (
    <PopoverRootRoot {...getPopoverRootRootProps()}>{children}</PopoverRootRoot>
  )
}

PopoverRoot.displayName = 'PopoverRoot'
