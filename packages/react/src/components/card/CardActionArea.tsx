'use client'

import { useMemo } from 'react'
import {
  useSlot,
  Ripple,
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { ButtonBase } from '../buttonBase'
import { cardActionArea } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { CardActionAreaProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const cardActionAreaRoot = `${prefix}-card-action-area`

  return useMemo(() => {
    const slots = {
      root: ['root'],
    }
    return composeClasses(slots, getUtilityClass(cardActionAreaRoot))
  }, [cardActionAreaRoot])
}

export const CardActionArea = <RootComponent extends ElementType = 'button'>(
  inProps: CardActionAreaProps<RootComponent>,
) => {
  const props = useDefaultProps<CardActionAreaProps<'button'>>({
    name: 'CardActionArea',
    props: inProps,
  })

  const { children, disabled, ...remainingProps } = props

  const ownerState: CardActionAreaProps = {
    ...props,
  }

  const style = useStyles({
    ownerState,
    name: 'CardActionArea',
    recipe: cardActionArea,
  })

  const slotProps = useSlotClasses()

  const [CardActionAreaRoot, getCardActionAreaProps] = useSlot({
    style,
    elementType: ButtonBase,
    classNames: slotProps.root,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
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
