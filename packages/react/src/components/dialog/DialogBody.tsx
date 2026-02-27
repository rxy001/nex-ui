'use client'

import {
  useDefaultProps,
  useSlotClasses,
  useRecipeStyles,
  useSlot,
} from '../utils'
import { dialogBodyRecipe } from '../../theme/recipes'
import { useDialogContentPropsContext } from './DialogContext'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DialogBodyProps } from './types'

const slots = ['root'] as const

export const DialogBody = <RootComponent extends ElementType = 'div'>(
  inProps: DialogBodyProps<RootComponent>,
) => {
  const { scroll } = useDialogContentPropsContext()

  const props = useDefaultProps<DialogBodyProps>({
    name: 'DialogBody',
    props: inProps,
  })

  const { children, tabIndex, ...remainingProps } = props

  const style = useRecipeStyles({
    ownerState: {
      ...props,
      scroll,
    },
    name: 'DialogBody',
    recipe: dialogBodyRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'DialogBody',
    slots,
  })

  const [DialogBodyRoot, getDialogBodyRootProps] = useSlot({
    style,
    component: ModalBody,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    ariaProps: {
      // https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI
      tabIndex: tabIndex ?? (scroll === 'inside' ? 0 : undefined),
    },
  })

  return (
    <DialogBodyRoot {...getDialogBodyRootProps()}>{children}</DialogBodyRoot>
  )
}

DialogBody.displayName = 'DialogBody'
