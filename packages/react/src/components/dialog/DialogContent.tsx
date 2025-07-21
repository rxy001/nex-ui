'use client'

import { useMemo } from 'react'
import { CloseOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { DialogRoot } from './DialogRoot'
import {
  useStyles,
  composeClasses,
  getUtilityClass,
  useDefaultProps,
  useSlot,
  Ripple,
} from '../utils'
import { DialogClose } from './DialogClose'
import { dialogContentRecipe } from '../../theme/recipes'
import { useDialog } from './DialogContext'
import { ButtonBase } from '../buttonBase'
import { ModalContent } from '../modal'
import type { ElementType } from 'react'
import type { DialogContentOwnerState, DialogContentProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const prefixClassName = `${prefix}-dialog-content`

    const slots = {
      root: ['root'],
      closeButton: ['close-button'],
    }

    return composeClasses(slots, getUtilityClass(prefixClassName))
  }, [prefix])
}

export const DialogContent = <RootComponent extends ElementType = 'section'>(
  inProps: DialogContentProps<RootComponent>,
) => {
  const {
    hideCloseButton,
    scroll,
    fullScreen,
    closeIcon: defaultCloseIcon,
    maxWidth: defaultMaxWidth,
  } = useDialog()
  const props = useDefaultProps<DialogContentProps>({
    name: 'DialogContent',
    props: inProps,
  })

  const {
    children,
    slotProps,
    maxWidth = defaultMaxWidth,
    closeIcon = defaultCloseIcon,
    ...remainingProps
  } = props

  const ownerState: DialogContentOwnerState = {
    ...props,
    maxWidth,
    fullScreen,
  }

  const styles = useStyles({
    ownerState: {
      scroll,
      ...ownerState,
    },
    name: 'DialogContent',
    recipe: dialogContentRecipe,
  })

  const classes = useSlotClasses()

  const [DialogContentRoot, getDialogContentRootProps] = useSlot({
    ownerState,
    elementType: ModalContent,
    style: styles.content,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
  })

  const [DialogContentCloseButton, getDialogContentCloseButtonProps] = useSlot({
    ownerState,
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    classNames: classes.closeButton,
    shouldForwardComponent: false,
  })

  return (
    <DialogRoot>
      <DialogContentRoot {...getDialogContentRootProps()}>
        {!hideCloseButton && (
          <DialogClose>
            <Ripple>
              <DialogContentCloseButton {...getDialogContentCloseButtonProps()}>
                {closeIcon ?? <CloseOutlined />}
              </DialogContentCloseButton>
            </Ripple>
          </DialogClose>
        )}
        {children}
      </DialogContentRoot>
    </DialogRoot>
  )
}

DialogContent.displayName = 'DialogContent'
