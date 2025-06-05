'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlotProps,
} from '../utils'
import { useNexUI } from '../provider'
import { dividerRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
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

export const Divider = <RootComponent extends ElementType = 'hr'>(
  inProps: DividerProps<RootComponent>,
) => {
  const props = useDefaultProps<DividerProps>({
    name: 'Divider',
    props: inProps,
  })

  const {
    ref,
    as = 'hr',
    orientation = 'horizontal',
    ...remainingProps
  } = props

  const ownerState: DividerOwnerState = { ...props, orientation, as }

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
      role: 'separator',
    },
  })

  return <nex.hr {...rootProps} />
}

Divider.displayName = 'Divider'
