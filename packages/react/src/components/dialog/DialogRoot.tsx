'use client'

import { ModalBackdrop, ModalRoot, ModalPortal, ModalMotion } from '../modal'
import { useStyles, useSlot, useSlotClasses } from '../utils'
import { useDialogPropsContext } from './DialogContext'
import { dialogRootRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'

const slots = ['root', 'backdrop']

export const DialogRoot = ({ children }: { children?: ReactNode }) => {
  const props = useDialogPropsContext()

  const {
    slotProps,
    hideBackdrop,
    classNames,
    container,
    keepMounted,
    motionProps,
    disableAnimation,
    preventScroll,
    ...remainingProps
  } = props

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
      disableAnimation,
    },
    additionalProps: {
      preventScroll,
    },
  })

  const [DialogBackdrop, getDialogBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  const renderDialogRootRoot = () => (
    <DialogRootRoot {...getDialogRootRootProps()}>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      {children}
    </DialogRootRoot>
  )

  return (
    <ModalPortal
      disablePresence={disableAnimation}
      container={container}
      keepMounted={keepMounted}
    >
      {disableAnimation ? (
        renderDialogRootRoot()
      ) : (
        <ModalMotion {...motionProps}>{renderDialogRootRoot()}</ModalMotion>
      )}
    </ModalPortal>
  )
}

DialogRoot.displayName = 'DialogRoot'
