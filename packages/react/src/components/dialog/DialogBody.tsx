'use client'

import { useDefaultProps, useSlotClasses, useStyles, useSlot } from '../utils'
import { dialogBodyRecipe } from '../../theme/recipes'
import { useDialogContent } from './DialogContext'
import { ModalBody } from '../modal'
import type { ElementType } from 'react'
import type { DialogBodyProps } from './types'

const slots = ['root']

export const DialogBody = <RootComponent extends ElementType = 'div'>(
  inProps: DialogBodyProps<RootComponent>,
) => {
  const { scroll } = useDialogContent()

  const props = useDefaultProps<DialogBodyProps>({
    name: 'DialogBody',
    props: inProps,
  })

  const { children, tabIndex, ...remainingProps } = props

  const style = useStyles({
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
    elementType: ModalBody,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    a11y: {
      // https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI
      tabIndex: tabIndex ?? (scroll === 'inside' ? 0 : undefined),
    },
  })

  return (
    <DialogBodyRoot {...getDialogBodyRootProps()}>{children}</DialogBodyRoot>
  )
}

DialogBody.displayName = 'DialogBody'
