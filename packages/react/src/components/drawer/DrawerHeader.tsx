'use client'

import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { drawerHeaderRecipe } from '../../theme/recipes'
import { ModalHeader } from '../modal'
import type { ElementType } from 'react'
import type { DrawerHeaderProps } from './types'

const slots = ['root'] as const

export const DrawerHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: DrawerHeaderProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerHeaderProps>({
    name: 'DrawerHeader',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const slotClasses = useSlotClasses({
    name: 'DrawerHeader',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'DrawerHeader',
    recipe: drawerHeaderRecipe,
  })

  const [DrawerHeaderRoot, getDrawerHeaderRootProps] = useSlot({
    style,
    component: ModalHeader,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  return (
    <DrawerHeaderRoot {...getDrawerHeaderRootProps()}>
      {children}
    </DrawerHeaderRoot>
  )
}

DrawerHeader.displayName = 'DrawerHeader'
