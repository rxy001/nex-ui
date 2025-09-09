'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { drawerFooterRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DrawerFooterProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-drawer-footer`

    const slots = {
      root: ['root'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

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

  const classes = useSlotClasses()

  const style = useStyles({
    ownerState,
    name: 'DrawerFooter',
    recipe: drawerFooterRecipe,
  })

  const [DrawerFooterRoot, getDrawerFooterRootProps] = useSlot({
    style,
    elementType: ModalFooter,
    classNames: classes.root,
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
