'use client'

import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import classNames from 'classnames'
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
  const {
    sx,
    as,
    colorPalette,
    children,
    gap,
    className,
    justify,
    align,
    direction,
    wrap,
    inline = false,
    ...remainingProps
  } = useDefaultProps({ name: 'Flex', props: inProps })

  const ownerState = {
    direction,
    justify,
    align,
    wrap,
    gap,
    sx,
    as,
    inline,
    className,
    ...remainingProps,
  }

  const classes = useUtilityClasses(ownerState)

  const styles = useStyles({ name: 'Flex', ownerState })

  return (
    <nex.div
      as={as}
      ref={ref}
      colorPalette={colorPalette}
      className={classNames(classes.root, className)}
      sx={{
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...styles,
        ...sx,
      }}
      {...remainingProps}
    >
      {children}
    </nex.div>
  )
})

Flex.displayName = 'Flex'
