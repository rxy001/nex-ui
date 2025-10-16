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
  const ownerState = useDialog()

  const {
    slotProps,
    hideBackdrop,
    classNames,
    open: _open,
    onOpenChange: _onOpenChange,
    container: _container,
    setOpen: _setOpen,
    restoreFocus: _restoreFocus,
    closeOnEscape: _closeOnEscape,
    preventScroll: _preventScroll,
    defaultOpen: _defaultOpen,
    keepMounted: _keepMounted,
    closeOnInteractBackdrop: _closeOnInteractBackdrop,
    ...remainingProps
  } = ownerState

  const slotClasses = useSlotClasses({
    name: 'Dialog',
    slots,
    classNames,
  })

  const styles = useStyles({
    ownerState,
    name: 'Dialog',
    recipe: dialogRootRecipe,
  })

  const [Root, getRootProps] = useSlot({
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
    <Root {...getRootProps()}>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      {children}
    </Root>
  )
}

DialogRoot.displayName = 'DialogRoot'
