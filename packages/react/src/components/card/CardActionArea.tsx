'use client'

import {
  useSlot,
  Ripple,
  useDefaultProps,
  useStyles,
  useSlotClasses,
} from '../utils'
import { ButtonBase } from '../buttonBase'
import { cardActionArea } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardActionAreaProps } from './types'

const slots = ['root']

export const CardActionArea = <RootComponent extends ElementType = 'button'>(
  inProps: CardActionAreaProps<RootComponent>,
) => {
  const props = useDefaultProps<CardActionAreaProps<'button'>>({
    name: 'CardActionArea',
    props: inProps,
  })

  const { children, disabled, ...remainingProps } = props

  const style = useStyles({
    ownerState: props,
    name: 'CardActionArea',
    recipe: cardActionArea,
  })

  const slotProps = useSlotClasses({
    name: 'CardActionArea',
    slots,
  })

  const [CardActionAreaRoot, getCardActionAreaProps] = useSlot({
    style,
    elementType: ButtonBase,
    classNames: slotProps.root,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
    },
    dataAttrs: {
      disabled,
    },
  })

  return (
    <Ripple disabled={disabled}>
      <CardActionAreaRoot {...getCardActionAreaProps()}>
        {children}
      </CardActionAreaRoot>
    </Ripple>
  )
}

CardActionArea.displayName = 'CardActionArea'
