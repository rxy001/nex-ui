'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { cardBodyRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { CardBodyOwnerState, CardBodyProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const cardBodyRoot = `${prefix}-card-body`

  return useMemo(() => {
    const slots = {
      root: ['root'],
    }
    return composeClasses(slots, getUtilityClass(cardBodyRoot))
  }, [cardBodyRoot])
}

export const CardBody = <RootComponent extends ElementType>(
  inProps: CardBodyProps<RootComponent>,
) => {
  const props = useDefaultProps<CardBodyProps<'div'>>({
    name: 'CardBody',
    props: inProps,
  })

  const ownerState: CardBodyOwnerState = {
    ...props,
  }

  const slotClasses = useSlotClasses()

  const style = useStyles({
    ownerState,
    name: 'CardBody',
    recipe: cardBodyRecipe,
  })

  const [CardBodyRoot, getCardBodyRootProps] = useSlot({
    ownerState,
    style,
    classNames: slotClasses.root,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return <CardBodyRoot {...getCardBodyRootProps()} />
}

CardBody.displayName = 'CardBody'
