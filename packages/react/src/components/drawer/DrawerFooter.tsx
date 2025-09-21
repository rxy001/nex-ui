'use client'

import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { drawerFooterRecipe } from '../../theme/recipes'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DrawerFooterProps } from './types'

const slots = ['root']

export const DrawerFooter = <RootComponent extends ElementType = 'div'>(
  inProps: DrawerFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerFooterProps>({
    name: 'DrawerFooter',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DrawerFooterProps = {
    ...props,
  }

  const slotClasses = useSlotClasses({
    name: 'DrawerFooter',
    slots,
  })

  const style = useStyles({
    ownerState,
    name: 'DrawerFooter',
    recipe: drawerFooterRecipe,
  })

  const [DrawerFooterRoot, getDrawerFooterRootProps] = useSlot({
    style,
    elementType: ModalFooter,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DrawerFooterRoot {...getDrawerFooterRootProps()}>
      {children}
    </DrawerFooterRoot>
  )
}

DrawerFooter.displayName = 'DrawerFooter'
