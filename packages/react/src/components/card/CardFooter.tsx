'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { cardFooterRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardFooterProps } from './types'

const slots = ['root'] as const

export const CardFooter = <RootComponent extends ElementType>(
  inProps: CardFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<CardFooterProps<'div'>>({
    name: 'CardFooter',
    props: inProps,
  })

  const style = useRecipeStyles({
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
    component: nex.div,
    externalForwardedProps: props,
  })

  return <CardFooterRoot {...getCardFooterRootProps()} />
}

CardFooter.displayName = 'CardFooter'
