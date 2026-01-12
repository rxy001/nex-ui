'use client'

import { useEffect, useMemo, useState } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { chain } from '@nex-ui/utils'
import { useSlot, DismissibleLayer, FocusTrap } from '../utils'
import { useModalContext } from './ModalContext'
import { useModalManager } from './ModalManager'
import type { ElementType } from 'react'
import type { ModalContentProps } from './types'

const recipe = defineRecipe({
  base: {
    width: 'full',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    bg: 'content',
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
    restoreFocus = true,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    ...remainingProps
  } = inProps as ModalContentProps
  const { modalId, open, setOpen } = useModalContext()

  const [paused, setPaused] = useState(false)

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

  useEffect(() => {
    const unsubscribe = modalManager.subscribe(() => {
      setPaused(!isTopmostModal())
    })

    return unsubscribe
  }, [isTopmostModal, modalManager])

  return (
    <DismissibleLayer
      onFocusOutside={onFocusOutside}
      onInteractOutside={onInteractOutside}
      onEscapeKeyDown={chain((_event: KeyboardEvent) => {
        if (closeOnEscape && open && isTopmostModal()) {
          setOpen(false)
        }
      }, onEscapeKeyDown)}
      onPointerDownOutside={chain((_event: PointerEvent) => {
        if (closeOnInteractOutside && open && isTopmostModal()) {
          setOpen(false)
        }
      }, onPointerDownOutside)}
    >
      <FocusTrap active={open} restoreFocus={restoreFocus} paused={paused}>
        <ModalContentRoot {...getModalContentRootProps()}>
          {children}
        </ModalContentRoot>
      </FocusTrap>
    </DismissibleLayer>
  )
}

ModalContent.displayName = 'ModalContent'
