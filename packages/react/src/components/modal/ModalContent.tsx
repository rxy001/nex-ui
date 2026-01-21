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

const useAriaProps = (props: ModalContentProps) => {
  const { modalContentId, modalHeaderId, modalBodyId } = useModalContext()

  const {
    id = modalContentId,
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': labelledBy = modalHeaderId,
    'aria-describedby': describedBy = modalBodyId,
  } = props

  return useMemo(() => {
    return {
      id,
      role,
      'aria-modal': ariaModal,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    }
  }, [ariaModal, describedBy, id, labelledBy, role])
}

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
  const { modalId, open, setOpen } = useModalContext()

  const modalManager = useModalManager()

  const isTopmostModal = useMemo(
    () => () => modalManager.isTopmostModal(modalId),
    [modalId, modalManager],
  )

  const ariaProps = useAriaProps(remainingProps)

  const [ModalContentRoot, getModalContentRootProps] = useSlot({
    style,
    elementType: 'section',
    externalForwardedProps: remainingProps,
    a11y: ariaProps,
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
