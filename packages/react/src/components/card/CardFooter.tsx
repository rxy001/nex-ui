'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  getUtilityClass,
  composeClasses,
} from '../utils'
import { useNexUI } from '../provider'
import { cardFooterRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardFooterOwnerState, CardFooterProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const cardFooterRoot = `${prefix}-card-footer`

  return useMemo(() => {
    const slots = {
      root: ['root'],
    }
    return composeClasses(slots, getUtilityClass(cardFooterRoot))
  }, [cardFooterRoot])
}

export const CardFooter = <RootComponent extends ElementType>(
  inProps: CardFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<CardFooterProps<'div'>>({
    name: 'CardFooter',
    props: inProps,
  })

  const ownerState: CardFooterOwnerState = {
    ...props,
  }

  const style = useStyles({
    ownerState,
    name: 'CardFooter',
    recipe: cardFooterRecipe,
  })

  const slotClasses = useSlotClasses()

  const [CardFooterRoot, getCardFooterRootProps] = useSlot({
    ownerState,
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <CardFooterRoot {...getCardFooterRootProps()} />
}

CardFooter.displayName = 'CardFooter'
