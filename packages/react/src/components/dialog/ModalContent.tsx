'use client'

import { CloseOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { ModalRoot } from './ModalRoot'
import {
  useStyles,
  composeClasses,
  getUtilityClass,
  useDefaultProps,
  useSlot,
  Ripple,
} from '../utils'
import { ModalClose } from './ModalClose'
import { modalContentRecipe } from '../../theme/recipes'
import { useModal, useModalProps } from './ModalContext'
import { ButtonBase } from '../buttonBase/ButtonBase'
import type { ElementType } from 'react'
import type { ModalContentOwnerState, ModalContentProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const slots = {
    content: ['content'],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(modalRoot))

  return composedClasses
}

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const { hideCloseButton } = useModalProps()
  const { setOpen } = useModal()
  const props = useDefaultProps<ModalContentProps>({
    name: 'ModalContent',
    props: inProps,
  })

  const { children, maxWidth = 'md', slotProps, ...remainingProps } = props

  const ownerState: ModalContentOwnerState = {
    ...props,
    maxWidth,
  }

  const styles = useStyles({
    ownerState,
    name: 'ModalContent',
    recipe: modalContentRecipe,
  })

  const classes = useSlotClasses()

  const [ModalContentRoot, getModalContentRootProps] = useSlot({
    ownerState,
    elementType: 'section',
    style: styles.content,
    classNames: classes.content,
    externalForwardedProps: remainingProps,
  })

  const [ModalContentCloseButton, getModalContentCloseButtonProps] = useSlot({
    ownerState,
    elementType: ButtonBase,
    externalSlotProps: slotProps?.closeButton,
    style: styles.closeButton,
    shouldForwardComponent: false,
    additionalProps: {
      onClick: () => {
        setOpen(false)
      },
    },
  })

  return (
    <ModalRoot>
      <ModalContentRoot {...getModalContentRootProps()}>
        {!hideCloseButton && (
          <ModalClose>
            <Ripple>
              <ModalContentCloseButton {...getModalContentCloseButtonProps()}>
                <CloseOutlined />
              </ModalContentCloseButton>
            </Ripple>
          </ModalClose>
        )}
        {children}
      </ModalContentRoot>
    </ModalRoot>
  )
}

ModalContent.displayName = 'ModalContent'
