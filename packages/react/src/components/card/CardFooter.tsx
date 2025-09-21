'use client'

import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { cardFooterRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardFooterProps } from './types'

const slots = ['root']

export const CardFooter = <RootComponent extends ElementType>(
  inProps: CardFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<CardFooterProps<'div'>>({
    name: 'CardFooter',
    props: inProps,
  })

  const style = useStyles({
    ownerState: props,
    name: 'CardFooter',
    recipe: cardFooterRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'CardFooter',
    slots,
  })

  const [CardFooterRoot, getCardFooterRootProps] = useSlot({
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <CardFooterRoot {...getCardFooterRootProps()} />
}

CardFooter.displayName = 'CardFooter'
