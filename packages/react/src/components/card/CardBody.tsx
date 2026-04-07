'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { cardBodyRecipe } from '../../themes/recipes'
import type { ElementType } from 'react'
import type { CardBodyProps } from './types'

const slots = ['root'] as const

export function CardBody<RootComponent extends ElementType>(
  inProps: CardBodyProps<RootComponent>,
) {
  const props = useDefaultProps<CardBodyProps<'div'>>({
    name: 'CardBody',
    props: inProps,
  })

  const slotClasses = useSlotClasses({
    name: 'CardBody',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'CardBody',
    recipe: cardBodyRecipe,
  })

  const [CardBodyRoot, getCardBodyRootProps] = useSlot({
    style,
    classNames: slotClasses.root,
    component: nex.div,
    externalForwardedProps: props,
  })

  return <CardBodyRoot {...getCardBodyRootProps()} />
}

CardBody.displayName = 'CardBody'
