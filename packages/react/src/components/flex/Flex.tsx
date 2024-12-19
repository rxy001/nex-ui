'use client'

import clsx from 'clsx'
import { forwardRef } from 'react'
import { nex, composeSx } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import type { FlexOwnerState, FlexProps } from './types'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'

const useUtilityClasses = (ownerState: FlexOwnerState) => {
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

export const Flex = forwardRef<HTMLDivElement, FlexProps>((inProps, ref) => {
  const props = useDefaultProps({ name: 'Flex', props: inProps })

  const {
    sx,
    as,
    gap,
    children,
    className,
    justify,
    align,
    direction,
    wrap,
    inline = false,
    ...remainingProps
  } = props

  const ownerState: FlexOwnerState = {
    ...props,
    gap,
    children,
    className,
    justify,
    align,
    direction,
    wrap,
    inline,
  }

  const classes = useUtilityClasses(ownerState)

  const styles = useStyles({ name: 'Flex', ownerState })

  const mergedSx = composeSx(
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
      sx={mergedSx}
      ref={ref}
      as={as}
      className={clsx(classes.root, className)}
      {...remainingProps}
    >
      {children}
    </nex.div>
  )
})

Flex.displayName = 'Flex'
