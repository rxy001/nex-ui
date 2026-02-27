'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { FocusTrap } from '../focusTrap'
import { popoverContentRecipe } from '../../theme/recipes'
import { PopoverRoot } from './PopoverRoot'
import { usePopoverContext } from './PopoverContext'
import type { ElementType } from 'react'
import type { PopoverContentProps } from './types'

const slots = ['root'] as const

export const PopoverContent = <RootComponent extends ElementType = 'div'>(
  inProps: PopoverContentProps<RootComponent>,
) => {
  const props = useDefaultProps<PopoverContentProps>({
    name: 'PopoverContent',
    props: inProps,
  })

  const { open, rootId } = usePopoverContext()
  const {
    loop,
    maxHeight,
    autoFocus,
    restoreFocus,
    maxWidth = 480,
    color = 'default',
    radius = 'md',
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    color,
    radius,
    maxWidth,
  }

  const style = useRecipeStyles({
    ownerState,
    name: 'PopoverContent',
    recipe: popoverContentRecipe,
  })

  const slotClasses = useSlotClasses({
    slots,
    name: 'PopoverContent',
  })

  const [PopoverContentRoot, getPopoverContentRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      color,
      radius,
    },
    ariaProps: {
      id: rootId,
      role: 'dialog',
    },
    additionalProps: {
      sx: {
        maxWidth,
        maxHeight,
      },
    },
  })

  return (
    <PopoverRoot>
      <FocusTrap
        loop={loop}
        restoreFocus={restoreFocus}
        active={open}
        autoFocus={autoFocus}
      >
        <PopoverContentRoot {...getPopoverContentRootProps()} />
      </FocusTrap>
    </PopoverRoot>
  )
}

PopoverContent.displayName = 'PopoverContent'
