'use client'

import { nex } from '@nex-ui/styled'
import type { Ref, ElementType } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  resolveSxProps,
} from '../utils'
import { useNexContext } from '../provider'
import type { DividerOwnerState, DividerProps } from './types'

const useSlotClasses = (ownerState: DividerOwnerState) => {
  const { prefix } = useNexContext()

  const dividerRoot = `${prefix}-divider`

  const { orientation } = ownerState

  const slots = {
    root: ['root', orientation && `orientation-${orientation}`],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(dividerRoot))

  return composedClasses
}

export const Divider = forwardRef(
  <RootComponent extends ElementType = 'hr'>(
    inProps: DividerProps<RootComponent>,
    ref: Ref<HTMLHRElement>,
  ) => {
    const props = useDefaultProps<DividerProps>({
      name: 'Divider',
      props: inProps,
    })

    const {
      sx,
      className,
      orientation = 'horizontal',
      ...remainingProps
    } = props

    const ownerState = { ...props, orientation }

    const classes = useSlotClasses(ownerState)

    const styles = useStyles({
      name: 'Divider',
      ownerState,
    })

    const rootProps = useSlotProps({
      externalSlotProps: remainingProps,
      externalForwardedProps: { ref, className },
      sx: [styles, resolveSxProps(sx, ownerState)],
      classNames: classes.root,
    })

    return <nex.hr {...rootProps} />
  },
)

Divider.displayName = 'Divider'
