'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { useNexContext } from '../provider'
import type { FlexOwnerState, FlexProps } from './types'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  resolveSxProps,
} from '../utils'

const useSlotClasses = (ownerState: FlexOwnerState) => {
  const { prefix } = useNexContext()

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
      sx,
      gap,
      children,
      className,
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

    const style = useStyles({ name: 'Flex', ownerState })

    const composedSx = {
      gap,
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      ...style,
    }

    const rootProps = useSlotProps({
      externalSlotProps: remainingProps,
      externalForwardedProps: { ref, className },
      sx: [composedSx, resolveSxProps(sx, ownerState)],
      classNames: classes.root,
    })

    return <nex.div {...rootProps}>{children}</nex.div>
  },
)

Flex.displayName = 'Flex'
