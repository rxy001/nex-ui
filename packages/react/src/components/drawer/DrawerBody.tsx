'use client'

import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { drawerBodyRecipe } from '../../theme/recipes'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DrawerBodyProps } from './types'

const slots = ['root']

export const DrawerBody = <RootComponent extends ElementType = 'div'>(
  inProps: DrawerBodyProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerBodyProps>({
    name: 'DrawerBody',
    props: inProps,
  })

  const { children, tabIndex = 0, ...remainingProps } = props

  const style = useStyles({
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
    elementType: ModalBody,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    a11y: {
      // https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI
      tabIndex,
    },
  })

  return (
    <DrawerBodyRoot {...getDrawerBodyRootProps()}>{children}</DrawerBodyRoot>
  )
}

DrawerBody.displayName = 'DrawerBody'
