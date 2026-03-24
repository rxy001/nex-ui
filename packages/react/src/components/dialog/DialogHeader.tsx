'use client'

import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { dialogHeaderRecipe } from '../../theme/recipes'
import { ModalHeader } from '../modal'
import type { ElementType } from 'react'
import type { DialogHeaderProps } from './types'

const slots = ['root'] as const

export function DialogHeader<RootComponent extends ElementType = 'h2'>(
  inProps: DialogHeaderProps<RootComponent>,
) {
  const props = useDefaultProps<DialogHeaderProps>({
    name: 'DialogHeader',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const slotClasses = useSlotClasses({
    name: 'DialogHeader',
    slots,
  })

  const style = useRecipeStyles({
    ownerState: props,
    name: 'DialogHeader',
    recipe: dialogHeaderRecipe,
  })

  const [DialogHeaderRoot, getDialogHeaderRootProps] = useSlot({
    style,
    component: ModalHeader,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  return (
    <DialogHeaderRoot {...getDialogHeaderRootProps()}>
      {children}
    </DialogHeaderRoot>
  )
}

DialogHeader.displayName = 'DialogHeader'
