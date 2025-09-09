'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { drawerHeaderRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ModalHeader } from '../modal'
import type { ElementType } from 'react'
import type { DrawerHeaderProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-drawer-header`

    const slots = {
      root: ['root'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

export const DrawerHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: DrawerHeaderProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerHeaderProps>({
    name: 'DrawerHeader',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DrawerHeaderProps = {
    ...props,
  }

  const classes = useSlotClasses()

  const style = useStyles({
    ownerState,
    name: 'DrawerHeader',
    recipe: drawerHeaderRecipe,
  })

  const [DrawerHeaderRoot, getDrawerHeaderRootProps] = useSlot({
    style,
    elementType: ModalHeader,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DrawerHeaderRoot {...getDrawerHeaderRootProps()}>
      {children}
    </DrawerHeaderRoot>
  )
}

DrawerHeader.displayName = 'DrawerHeader'
