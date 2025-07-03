'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { useNexUI } from '../provider'
import { dividerRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { DividerOwnerState, DividerProps } from './types'

const useSlotClasses = (ownerState: DividerOwnerState) => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const dividerRoot = `${prefix}-divider`

    const { orientation } = ownerState

    const slots = {
      root: ['root', orientation && `orientation-${orientation}`],
    }

    return composeClasses(slots, getUtilityClass(dividerRoot))
  }, [ownerState, prefix])
}

export const Divider = <RootComponent extends ElementType = 'hr'>(
  inProps: DividerProps<RootComponent>,
) => {
  const props = useDefaultProps<DividerProps>({
    name: 'Divider',
    props: inProps,
  })

  const {
    role = 'separator',
    orientation = 'horizontal',
    ...remainingProps
  } = props

  const ownerState: DividerOwnerState = { ...props, orientation }

  const classes = useSlotClasses(ownerState)

  const style = useStyles({
    ownerState,
    name: 'Divider',
    recipe: dividerRecipe,
  })

  const [DividerRoot, getDividerRootProps] = useSlot({
    ownerState,
    style,
    elementType: 'hr',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    a11y: {
      role,
    },
  })

  return <DividerRoot {...getDividerRootProps()} />
}

Divider.displayName = 'Divider'
