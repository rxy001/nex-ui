'use client'

import { ModalBackdrop, ModalRoot, ModalPortal, ModalMotion } from '../modal'
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

  const {
    slotProps,
    hideBackdrop,
    classNames,
    container,
    keepMounted,
    motionProps,
    animateDisabled,
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
    },
  })

  const [DialogBackdrop, getDialogBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  const renderChildren = () => (
    <>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      {children}
    </>
  )

  return (
    <ModalPortal
      animateDisabled={animateDisabled}
      container={container}
      keepMounted={keepMounted}
    >
      <DialogRootRoot {...getDialogRootRootProps()}>
        {animateDisabled ? (
          renderChildren()
        ) : (
          <ModalMotion {...motionProps}>{renderChildren()}</ModalMotion>
        )}
      </DialogRootRoot>
    </ModalPortal>
  )
}

DialogRoot.displayName = 'DialogRoot'
