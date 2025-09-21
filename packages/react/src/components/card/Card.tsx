'use client'

import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { cardRecipe } from '../../theme/recipes'
import type { CardProps } from './types'
import type { ElementType } from 'react'

const slots = ['root']

export const Card = <RootComponent extends ElementType = 'div'>(
  inProps: CardProps<RootComponent>,
) => {
  const props = useDefaultProps<CardProps<'div'>>({
    name: 'Card',
    props: inProps,
  })

  const {
    shadow = 'md',
    radius = 'md',
    hoverable = false,
    blurred = false,
    ...remainingProps
  } = props

  const ownerState: CardProps = {
    ...props,
    hoverable,
    blurred,
    shadow,
    radius,
  }

  const slotClasses = useSlotClasses({
    name: 'Card',
    slots,
  })

  const style = useStyles({ ownerState, name: 'Card', recipe: cardRecipe })

  const [CardRoot, getCardProps] = useSlot({
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    dataAttrs: {
      shadow,
      radius,
      hoverable,
      blurred,
    },
  })

  return <CardRoot {...getCardProps()} />
}

Card.displayName = 'Card'
