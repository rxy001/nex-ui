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
} from '../utils'
import { useNexUI } from '../provider'
import { dividerRecipe } from '../../theme/recipes'
import type { DividerOwnerState, DividerProps } from './types'

const useSlotClasses = (ownerState: DividerOwnerState) => {
  const { prefix } = useNexUI()

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

    const { orientation = 'horizontal', ...remainingProps } = props

    const ownerState = { ...props, orientation }

    const classes = useSlotClasses(ownerState)

    const styles = useStyles({
      name: 'Divider',
      ownerState,
      recipe: dividerRecipe,
    })

    const rootProps = useSlotProps({
      ownerState,
      externalForwardedProps: remainingProps,
      sx: styles,
      classNames: classes.root,
      additionalProps: {
        ref,
      },
    })

    return <nex.hr {...rootProps} />
  },
)

Divider.displayName = 'Divider'
