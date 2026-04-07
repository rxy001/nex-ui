'use client'

import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { dialogFooterRecipe } from '../../themes/recipes'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DialogFooterProps } from './types'

const slots = ['root'] as const

export function DialogFooter<RootComponent extends ElementType = 'div'>(
  inProps: DialogFooterProps<RootComponent>,
) {
  const props = useDefaultProps<DialogFooterProps>({
    name: 'DialogFooter',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const slotClasses = useSlotClasses({
    name: 'DialogFooter',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'DialogFooter',
    recipe: dialogFooterRecipe,
  })

  const [DialogFooterRoot, getDialogFooterRootProps] = useSlot({
    style,
    component: ModalFooter,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  return (
    <DialogFooterRoot {...getDialogFooterRootProps()}>
      {children}
    </DialogFooterRoot>
  )
}

DialogFooter.displayName = 'DialogFooter'
