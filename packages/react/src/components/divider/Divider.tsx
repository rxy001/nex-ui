'use client'

import clsx from 'clsx'
import { forwardRef } from 'react'
import { composeSx, nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { DividerOwnerState, DividerProps } from './types'
import { useNexContext } from '../provider'

const useUtilityClasses = (ownerState: DividerOwnerState) => {
  const { prefix } = useNexContext()

  const dividerRoot = `${prefix}-divider`

  const { orientation, classes } = ownerState

  const slots = {
    root: ['root', orientation && `orientation-${orientation}`],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(dividerRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (inProps, ref) => {
    const props = useDefaultProps({ name: 'Divider', props: inProps })

    const {
      sx,
      className,
      orientation = 'horizontal',
      ...remainingProps
    } = props

    const ownerState = { ...props, orientation }

    const classes = useUtilityClasses(ownerState)

    const style = useStyles({ name: 'Divider', ownerState })

    const composedSx = composeSx(style, sx)

    return (
      <nex.hr
        ref={ref}
        sx={composedSx}
        className={clsx(classes.root, className)}
        {...remainingProps}
      />
    )
  },
)
