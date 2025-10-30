'use client'

import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { PopperContent, usePopper } from '../popper'
import { popoverContentRecipe } from '../../theme/recipes'
import { PopoverRoot } from './PopoverRoot'
import { FocusTrap } from '../focusTrap'
import { usePopover } from './PopoverContext'
import type { ElementType } from 'react'
import type { PopoverContentProps } from './types'

const slots = ['root']

export const PopoverContent = <RootComponent extends ElementType = 'div'>(
  inProps: PopoverContentProps<RootComponent>,
) => {
  const props = useDefaultProps<PopoverContentProps>({
    name: 'PopoverContent',
    props: inProps,
  })

  const { open } = usePopper()

  const { restoreFocus } = usePopover()

  const { color = 'default', radius = 'md', ...remainingProps } = props

  const ownerState = {
    ...props,
    color,
    radius,
  }

  const style = useStyles({
    ownerState,
    name: 'PopoverContent',
    recipe: popoverContentRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'PopoverContent',
    slots,
  })

  const [PopoverContentRoot, getPopoverContentRootProps] = useSlot({
    style,
    elementType: PopperContent,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      color,
      radius,
    },
    additionalProps: {
      tabIndex: -1,
    },
  })

  return (
    <PopoverRoot>
      <FocusTrap active={open} restoreFocus={restoreFocus}>
        <PopoverContentRoot {...getPopoverContentRootProps()} />
      </FocusTrap>
    </PopoverRoot>
  )
}

PopoverContent.displayName = 'PopoverContent'
