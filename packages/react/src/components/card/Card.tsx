'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { cardRecipe } from '../../theme/recipes'
import type { CardProps } from './types'
import type { ElementType } from 'react'

const slots = ['root'] as const

export function Card<RootComponent extends ElementType = 'div'>(
  inProps: CardProps<RootComponent>,
) {
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

  const style = useRecipeStyles({
    ownerState,
    name: 'Card',
    recipe: cardRecipe,
  })

  const [CardRoot, getCardProps] = useSlot({
    style,
    classNames: slotClasses.root,
    component: nex.div,
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
