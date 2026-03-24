'use client'

import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { drawerBodyRecipe } from '../../theme/recipes'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DrawerBodyProps } from './types'

const slots = ['root'] as const

export function DrawerBody<RootComponent extends ElementType = 'div'>(
  inProps: DrawerBodyProps<RootComponent>,
) {
  const props = useDefaultProps<DrawerBodyProps>({
    name: 'DrawerBody',
    props: inProps,
  })

  const { children, tabIndex = 0, ...remainingProps } = props

  const style = useRecipeStyles({
    ownerState: props,
    name: 'DrawerBody',
    recipe: drawerBodyRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'DrawerBody',
    slots,
  })

  const [DrawerBodyRoot, getDrawerBodyRootProps] = useSlot({
    style,
    component: ModalBody,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    ariaProps: {
      // https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI
      tabIndex,
    },
  })

  return (
    <DrawerBodyRoot {...getDrawerBodyRootProps()}>{children}</DrawerBodyRoot>
  )
}

DrawerBody.displayName = 'DrawerBody'
