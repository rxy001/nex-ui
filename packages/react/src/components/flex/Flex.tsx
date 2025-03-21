'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { useNexUI } from '../provider'
import { flexRecipe } from '../../theme/recipes'
import type { FlexOwnerState, FlexProps } from './types'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
} from '../utils'

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

export const Flex = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: FlexProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
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

    const ownerState = {
      ...props,
      direction,
      inline,
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
  },
)

Flex.displayName = 'Flex'
