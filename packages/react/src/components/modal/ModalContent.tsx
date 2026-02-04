'use client'

import { useMemo } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { chain } from '@nex-ui/utils'
import { DismissibleLayer } from '../dismissibleLayer'
import { useSlot } from '../utils'
import { FocusTrap } from '../focusTrap'
import { useModalContext } from './ModalContext'
import { useModalManager } from './ModalManager'
import type { ElementType } from 'react'
import type { ModalContentProps } from './types'

const recipe = defineRecipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    bg: 'content',
    position: 'relative',
  },
})

const style = recipe()

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const {
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    onFocusOutside,
    children,
    restoreFocus,
    loop,
    autoFocus,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    ...remainingProps
  } = inProps as ModalContentProps
  const { modalId, open, setOpen, modalContentId, modalHeaderId, modalBodyId } =
    useModalContext()
  const modalManager = useModalManager()

  const isTopmostModal = useMemo(
    () => () => modalManager.isTopmostModal(modalId),
    [modalId, modalManager],
  )

  const [ModalContentRoot, getModalContentRootProps] = useSlot({
    style,
    elementType: 'section',
    externalForwardedProps: remainingProps,
    ariaProps: {
      id: modalContentId,
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': modalHeaderId,
      'aria-describedby': modalBodyId,
    },
    dataAttrs: {
      closeOnEscape,
      restoreFocus,
    },
  })

  return (
    <DismissibleLayer
      onInteractOutside={onInteractOutside}
      onFocusOutside={chain(onFocusOutside, (event) => {
        event.preventDefault()
      })}
      onEscapeKeyDown={chain(onEscapeKeyDown, (event) => {
        if (!closeOnEscape || !isTopmostModal()) event.preventDefault()
      })}
      onPointerDownOutside={chain(onPointerDownOutside, (event) => {
        if (!closeOnInteractOutside || !isTopmostModal()) event.preventDefault()
      })}
      onDismiss={() => {
        setOpen(false)
      }}
    >
      <FocusTrap
        active={open}
        restoreFocus={restoreFocus}
        autoFocus={autoFocus}
        loop={loop}
      >
        <ModalContentRoot {...getModalContentRootProps()}>
          {children}
        </ModalContentRoot>
      </FocusTrap>
    </DismissibleLayer>
  )
}

ModalContent.displayName = 'ModalContent'
