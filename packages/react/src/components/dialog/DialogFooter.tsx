'use client'

import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { dialogFooterRecipe } from '../../theme/recipes'
import { ModalFooter } from '../modal'
import type { ElementType } from 'react'
import type { DialogFooterProps } from './types'

const slots = ['root']

export const DialogFooter = <RootComponent extends ElementType = 'div'>(
  inProps: DialogFooterProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogFooterProps>({
    name: 'DialogFooter',
    props: inProps,
  })

  const { children, ...remainingProps } = props

  const ownerState: DialogFooterProps = {
    ...props,
  }

  const slotClasses = useSlotClasses({
    name: 'DialogFooter',
    slots,
  })

  const style = useStyles({
    ownerState,
    name: 'DialogFooter',
    recipe: dialogFooterRecipe,
  })

  const [DialogFooterRoot, getDialogFooterRootProps] = useSlot({
    style,
    elementType: ModalFooter,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  return (
    <DialogFooterRoot {...getDialogFooterRootProps()}>
      {children}
    </DialogFooterRoot>
  )
}

DialogFooter.displayName = 'DialogFooter'
