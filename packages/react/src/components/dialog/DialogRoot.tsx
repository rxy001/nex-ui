'use client'

import { ModalBackdrop, ModalRoot, ModalPortal, ModalMotion } from '../modal'
import { useStyles, useSlot, useSlotClasses } from '../utils'
import { useDialogRootProps } from './DialogContext'
import { dialogRootRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'

type DialogRootProps = {
  children?: ReactNode
}

const slots = ['root', 'backdrop']

export const DialogRoot = ({ children }: DialogRootProps) => {
  const props = useDialogRootProps()

  const {
    slotProps,
    hideBackdrop,
    classNames,
    container,
    keepMounted,
    motionProps,
    disableAnimation,
    closeOnEscape,
    closeOnInteractBackdrop,
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
    },
    additionalProps: {
      closeOnEscape,
      preventScroll,
      closeOnInteractOutside: !hideBackdrop && closeOnInteractBackdrop,
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
      disableAnimation={disableAnimation}
      container={container}
      keepMounted={keepMounted}
    >
      <DialogRootRoot {...getDialogRootRootProps()}>
        {disableAnimation ? (
          renderChildren()
        ) : (
          <ModalMotion {...motionProps}>{renderChildren()}</ModalMotion>
        )}
      </DialogRootRoot>
    </ModalPortal>
  )
}

DialogRoot.displayName = 'DialogRoot'
