'use client'

import * as m from 'motion/react-m'
import { ModalBackdrop, ModalPanel, ModalRoot } from '../modal'
import { useStyles, composeClasses, getUtilityClass, useSlot } from '../utils'
import { useDialog } from './DialogContext'
import { dialogRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { DialogOwnerState } from './types'
import type { Variants } from 'motion'
import type { ReactNode } from 'react'

type DialogRootProps = {
  children?: ReactNode
}

const panelVariants: Variants = {
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transform: 'scale(1.04)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
}

const useSlotClasses = (ownerState: DialogOwnerState) => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-dialog`

  const { classes, open, scroll, placement, maxWidth, fullScreen } = ownerState

  const slots = {
    root: [
      'root',
      `placement-${placement}`,
      `scroll-${scroll}`,
      open && 'open',
      `max-width-${maxWidth}`,
      fullScreen && 'full-screen',
    ],
    backdrop: ['backdrop'],
    panel: ['panel'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(modalRoot),
    classes,
  )

  return composedClasses
}

export const DialogRoot = ({ children }: DialogRootProps) => {
  const ownerState = useDialog()

  const { slotProps, hideBackdrop, open: _, ...remainingProps } = ownerState

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Dialog',
    recipe: dialogRecipe,
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

  const [DialogPanel, getDialogPanelProps] = useSlot({
    ownerState,
    elementType: ModalPanel,
    style: styles.panel,
    externalSlotProps: slotProps?.panel,
    shouldForwardComponent: false,
    classNames: classes.panel,
    additionalProps: {
      as: m.div,
      variants: panelVariants,
    },
  })

  return (
    <Root {...getRootProps()}>
      {!hideBackdrop && <DialogBackdrop {...getDialogBackdropProps()} />}
      <DialogPanel {...getDialogPanelProps()}>{children}</DialogPanel>
    </Root>
  )
}

DialogRoot.displayName = 'DialogRoot'
