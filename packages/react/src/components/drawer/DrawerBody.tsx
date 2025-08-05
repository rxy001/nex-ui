'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { drawerBodyRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DrawerBodyOwnerState, DrawerBodyProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-drawer-body`

    const slots = {
      root: ['root'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

export const DrawerBody = <RootComponent extends ElementType = 'div'>(
  inProps: DrawerBodyProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerBodyProps>({
    name: 'DrawerBody',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DrawerBodyOwnerState = {
    ...props,
  }

  const style = useStyles({
    ownerState,
    name: 'DrawerBody',
    recipe: drawerBodyRecipe,
  })

  const classes = useSlotClasses()

  const [DrawerBodyRoot, getDrawerBodyRootProps] = useSlot({
    ownerState,
    style,
    elementType: ModalBody,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DrawerBodyRoot {...getDrawerBodyRootProps()}>{children}</DrawerBodyRoot>
  )
}

DrawerBody.displayName = 'DrawerBody'
