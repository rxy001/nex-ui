'use client'

import { nex } from '@nex-ui/styled'
import { useNexUI } from '../provider'
import { flexRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlotProps,
} from '../utils'
import type { FlexOwnerState, FlexProps } from './types'
import type { ElementType } from 'react'

const useSlotClasses = (ownerState: FlexOwnerState) => {
  const { prefix } = useNexUI()

  const flexRoot = `${prefix}-flex`

  const { inline, justify, align, direction, wrap, gap } = ownerState

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

  const composedClasses = composeClasses(slots, getUtilityClass(flexRoot))

  return composedClasses
}

export const Flex = <RootComponent extends ElementType = 'div'>(
  inProps: FlexProps<RootComponent>,
) => {
  const props = useDefaultProps<FlexProps>({ name: 'Flex', props: inProps })

  const {
    gap,
    ref,
    children,
    justify,
    align,
    wrap,
    as = 'div',
    direction = 'row',
    inline = false,
    ...remainingProps
  } = props

  const ownerState: FlexOwnerState = {
    ...props,
    direction,
    inline,
    as,
  }

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({ name: 'Flex', ownerState, recipe: flexRecipe })

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    sx: styles,
    classNames: classes.root,
    additionalProps: {
      ref,
      as,
      sx: {
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
      },
    },
  })

  return <nex.div {...rootProps}>{children}</nex.div>
}

Flex.displayName = 'Flex'
