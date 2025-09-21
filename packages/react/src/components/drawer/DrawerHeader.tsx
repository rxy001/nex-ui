'use client'

import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { drawerHeaderRecipe } from '../../theme/recipes'
import { ModalHeader } from '../modal'
import type { ElementType } from 'react'
import type { DrawerHeaderProps } from './types'

const slots = ['root']

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

  const slotClasses = useSlotClasses({
    name: 'DrawerHeader',
    slots,
  })

  const style = useStyles({
    ownerState,
    name: 'DrawerHeader',
    recipe: drawerHeaderRecipe,
  })

  const [DrawerHeaderRoot, getDrawerHeaderRootProps] = useSlot({
    style,
    elementType: ModalHeader,
    classNames: slotClasses.root,
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
