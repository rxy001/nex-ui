'use client'

import { ModalBackdrop, ModalRoot } from '../modal'
import { useStyles, useSlot, useSlotClasses } from '../utils'
import { useDialog } from './DialogContext'
import { dialogRootRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'

type DialogRootProps = {
  children?: ReactNode
}

const slots = ['root', 'backdrop']

export const DialogRoot = ({ children }: DialogRootProps) => {
  const props = useDialog()

  const { slotProps, hideBackdrop, classNames, ...remainingProps } = props

  const slotClasses = useSlotClasses({
    name: 'Dialog',
    slots,
    classNames,
  })

  const styles = useStyles({
    ownerState: props,
    name: 'Dialog',
    recipe: dialogRootRecipe,
  })

  const [DialogRootRoot, getDialogRootRootProps] = useSlot({
    elementType: ModalRoot,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: slotClasses.root,
    dataAttrs: {
      hideBackdrop,
    },
  })

  const [DialogBackdrop, getDialogBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  return (
    <DialogRootRoot {...getDialogRootRootProps()}>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      {children}
    </DialogRootRoot>
  )
}

DialogRoot.displayName = 'DialogRoot'
