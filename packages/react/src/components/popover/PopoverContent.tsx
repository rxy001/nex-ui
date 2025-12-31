'use client'

import { useRef } from 'react'
import {
  useFocusTrap,
  useDefaultProps,
  useSlot,
  useStyles,
  useSlotClasses,
} from '../utils'
import { PopperContent, usePopper } from '../popper'
import { popoverContentRecipe } from '../../theme/recipes'
import { PopoverRoot } from './PopoverRoot'
import { usePopoverProps } from './PopoverContext'
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

  const { restoreFocus } = usePopoverProps()

  const { open } = usePopper()

  const ref = useRef<HTMLDivElement>(null)

  const {
    maxHeight,
    maxWidth = 480,
    color = 'default',
    radius = 'md',
    ...remainingProps
  } = props

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

  const focusTrapHandlers = useFocusTrap({
    ref,
    active: open,
    restoreFocus,
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
      maxWidth,
      maxHeight,
      ref,
      ...focusTrapHandlers,
    },
  })

  return (
    <PopoverRoot>
      <PopoverContentRoot {...getPopoverContentRootProps()} />
    </PopoverRoot>
  )
}

PopoverContent.displayName = 'PopoverContent'
