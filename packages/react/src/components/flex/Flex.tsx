'use client'

import { useMemo } from 'react'

import { useNexUI } from '../provider'
import { flexRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import type { FlexOwnerState, FlexProps } from './types'
import type { ElementType } from 'react'

const useSlotClasses = (ownerState: FlexOwnerState) => {
  const { prefix } = useNexUI()
  const { inline, justify, align, direction, wrap, gap } = ownerState

  return useMemo(() => {
    const flexRoot = `${prefix}-flex`

    const slots = {
      root: [
        'root',
        inline && `inline`,
        justify && `justify-${justify}`,
        align && `align-${align}`,
        direction && `direction-${direction}`,
        wrap && `wrap-${wrap}`,
        gap ? `gap-${gap}` : '',
      ],
    }

    return composeClasses(slots, getUtilityClass(flexRoot))
  }, [align, direction, gap, inline, justify, prefix, wrap])
}

export const Flex = <RootComponent extends ElementType = 'div'>(
  inProps: FlexProps<RootComponent>,
) => {
  const props = useDefaultProps<FlexProps>({ name: 'Flex', props: inProps })

  const {
    gap,
    children,
    justify,
    align,
    wrap,
    direction = 'row',
    inline = false,
    ...remainingProps
  } = props

  const ownerState: FlexOwnerState = {
    ...props,
    direction,
    inline,
  }

  const classes = useSlotClasses(ownerState)

  const style = useStyles({ ownerState, name: 'Flex', recipe: flexRecipe })

  const [FlexRoot, getFlexRootProps] = useSlot({
    style,
    ownerState,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    additionalProps: {
      sx: {
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
      },
    },
  })

  return <FlexRoot {...getFlexRootProps()}>{children}</FlexRoot>
}

Flex.displayName = 'Flex'
