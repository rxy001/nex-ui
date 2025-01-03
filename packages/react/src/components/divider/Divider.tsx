'use client'

import clsx from 'clsx'
import { composeSx, nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
} from '../utils'
import { useNexContext } from '../provider'
import type { DividerOwnerState, DividerProps } from './types'

const useUtilityClasses = <RootComponent extends ElementType = 'hr'>(
  ownerState: DividerOwnerState<RootComponent>,
) => {
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

export const Divider = forwardRef(
  <RootComponent extends ElementType = 'hr'>(
    inProps: DividerProps<RootComponent>,
    ref: Ref<HTMLHRElement>,
  ) => {
    const props = useDefaultProps({ name: 'Divider', props: inProps })

    const {
      sx,
      as,
      className,
      orientation = 'horizontal',
      ...remainingProps
    } = props

    const ownerState = { ...props, orientation }

    const classes = useUtilityClasses<RootComponent>(ownerState)

    const style = useStyles({ name: 'Divider', ownerState })

    return (
      <nex.hr
        as={as as ElementType}
        ref={ref}
        sx={composeSx(style, sx)}
        className={clsx(classes.root, className)}
        {...remainingProps}
      />
    )
  },
)

Divider.displayName = 'Divider'
