'use client'

import clsx from 'clsx'
import { nex, composeSx } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import { useNexContext } from '../provider'
import type { FlexOwnerState, FlexProps } from './types'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
} from '../utils'

const useUtilityClasses = <RootComponent extends ElementType = 'div'>(
  ownerState: FlexOwnerState<RootComponent>,
) => {
  const { prefix } = useNexContext()

  const flexRoot = `${prefix}-flex`

  const { inline, justify, align, direction, wrap, gap, classes } = ownerState

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

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(flexRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const Flex = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: FlexProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps({ name: 'Flex', props: inProps })

    const {
      sx,
      as,
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

    const classes = useUtilityClasses(ownerState)

    const styles = useStyles({ name: 'Flex', ownerState })

    const composedSx = composeSx(
      {
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...styles,
      },
      sx,
    )

    return (
      <nex.div
        sx={composedSx}
        ref={ref}
        as={as as ElementType}
        className={clsx(classes.root, className)}
        {...remainingProps}
      >
        {children}
      </nex.div>
    )
  },
)

Flex.displayName = 'Flex'
