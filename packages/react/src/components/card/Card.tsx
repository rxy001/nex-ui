'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { cardRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { CardProps } from './types'
import type { ElementType } from 'react'

const useSlotClasses = (ownerState: CardProps) => {
  const { prefix } = useNexUI()
  const { blurred, shadow, radius, hoverable } = ownerState
  const cardRoot = `${prefix}-card`

  return useMemo(() => {
    const slots = {
      root: [
        'root',
        `shadow-${shadow}`,
        `radius-${radius}`,
        blurred && 'blurred',
        hoverable && 'hoverable',
      ],
    }
    return composeClasses(slots, getUtilityClass(cardRoot))
  }, [blurred, cardRoot, radius, shadow, hoverable])
}

export const Card = <RootComponent extends ElementType = 'div'>(
  inProps: CardProps<RootComponent>,
) => {
  const props = useDefaultProps<CardProps<'div'>>({
    name: 'Card',
    props: inProps,
  })

  const { shadow = 'md', radius = 'md', ...remainingProps } = props

  const ownerState: CardProps = {
    ...props,
    shadow,
    radius,
  }

  const slotClasses = useSlotClasses(ownerState)

  const style = useStyles({ ownerState, name: 'Card', recipe: cardRecipe })

  const [CardRoot, getCardProps] = useSlot({
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: remainingProps,
  })

  return <CardRoot {...getCardProps()} />
}

Card.displayName = 'Card'
