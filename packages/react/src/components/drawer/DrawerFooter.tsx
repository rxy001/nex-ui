'use client'

import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { drawerFooterRecipe } from '../../theme/recipes'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DrawerFooterProps } from './types'

const slots = ['root'] as const

export function DrawerFooter<RootComponent extends ElementType = 'div'>(
  inProps: DrawerFooterProps<RootComponent>,
) {
  const props = useDefaultProps<DrawerFooterProps>({
    name: 'DrawerFooter',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const slotClasses = useSlotClasses({
    name: 'DrawerFooter',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'DrawerFooter',
    recipe: drawerFooterRecipe,
  })

  const [DrawerFooterRoot, getDrawerFooterRootProps] = useSlot({
    style,
    component: ModalFooter,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  return (
    <DrawerFooterRoot {...getDrawerFooterRootProps()}>
      {children}
    </DrawerFooterRoot>
  )
}

DrawerFooter.displayName = 'DrawerFooter'
