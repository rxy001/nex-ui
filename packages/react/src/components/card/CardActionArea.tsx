'use client'

import {
  useSlot,
  useDefaultProps,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { Ripple } from '../ripple'
import { ButtonBase } from '../buttonBase'
import { cardActionArea } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardActionAreaProps } from './types'

const slots = ['root'] as const

export function CardActionArea<RootComponent extends ElementType = 'button'>(
  inProps: CardActionAreaProps<RootComponent>,
) {
  const props = useDefaultProps<CardActionAreaProps<'button'>>({
    name: 'CardActionArea',
    props: inProps,
  })

  const {
    children,
    disabled = false,
    disableRipple = false,
    ...remainingProps
  } = props

  const ownerState = {
    ...props,
    disabled,
    disableRipple,
  }

  const style = useRecipeStyles({
    ownerState,
    name: 'CardActionArea',
    recipe: cardActionArea,
  })

  const slotProps = useSlotClasses({
    name: 'CardActionArea',
    slots,
  })

  const [CardActionAreaRoot, getCardActionAreaProps] = useSlot({
    style,
    component: ButtonBase,
    classNames: slotProps.root,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
    },
    dataAttrs: {
      disableRipple,
    },
  })

  return (
    <Ripple disabled={disableRipple || disabled}>
      <CardActionAreaRoot {...getCardActionAreaProps()}>
        {children}
      </CardActionAreaRoot>
    </Ripple>
  )
}

CardActionArea.displayName = 'CardActionArea'
