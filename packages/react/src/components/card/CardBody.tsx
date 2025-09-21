'use client'

import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { cardBodyRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardBodyProps } from './types'

const slots = ['root']

export const CardBody = <RootComponent extends ElementType>(
  inProps: CardBodyProps<RootComponent>,
) => {
  const props = useDefaultProps<CardBodyProps<'div'>>({
    name: 'CardBody',
    props: inProps,
  })

  const slotClasses = useSlotClasses({
    name: 'CardBody',
    slots,
  })

  const style = useStyles({
    ownerState: props,
    name: 'CardBody',
    recipe: cardBodyRecipe,
  })

  const [CardBodyRoot, getCardBodyRootProps] = useSlot({
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <CardBodyRoot {...getCardBodyRootProps()} />
}

CardBody.displayName = 'CardBody'
