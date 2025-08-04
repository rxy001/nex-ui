'use client'

import { useMemo } from 'react'
import { ModalBackdrop, ModalRoot } from '../modal'
import { useStyles, composeClasses, getUtilityClass, useSlot } from '../utils'
import { useDialog } from './DialogContext'
import { dialogRootRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ReactNode } from 'react'
import type { DialogOwnerState } from './types'

type DialogRootProps = {
  children?: ReactNode
}

const useSlotClasses = (ownerState: DialogOwnerState) => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-dialog`

  const { classes, open } = ownerState

  return useMemo(() => {
    const slots = {
      root: ['root', open && 'open'],
      backdrop: ['backdrop'],
    }

    const composedClasses = composeClasses(
      slots,
      getUtilityClass(modalRoot),
      classes,
    )

    return composedClasses
  }, [classes, modalRoot, open])
}

export const DialogRoot = ({ children }: DialogRootProps) => {
  const ownerState = useDialog()

  const {
    slotProps,
    hideBackdrop,
    onOpenChange: _onOpenChange,
    container: _container,
    classes: _classes,
    open: _open,
    setOpen: _setOpen,
    restoreFocus: _restoreFocus,
    closeOnEscape: _closeOnEscape,
    preventScroll: _preventScroll,
    defaultOpen: _defaultOpen,
    keepMounted: _keepMounted,
    closeOnInteractBackdrop: _closeOnInteractBackdrop,
    ...remainingProps
  } = ownerState

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Dialog',
    recipe: dialogRootRecipe,
  })

  const [Root, getRootProps] = useSlot({
    ownerState,
    elementType: ModalRoot,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: classes.root,
  })

  const [DialogBackdrop, getDialogBackdropProps] = useSlot({
    ownerState,
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: classes.backdrop,
  })

  return (
    <Root {...getRootProps()}>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      {children}
    </Root>
  )
}

DialogRoot.displayName = 'DialogRoot'
