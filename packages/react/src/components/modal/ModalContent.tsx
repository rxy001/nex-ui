'use client'

import { useEffect, useMemo, useState } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import { FocusTrap } from '../focusTrap'
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
  const { modalContentId, modalHeaderId, modalBodyId } = useModal()

  const {
    tabIndex = -1,
    id = modalContentId,
    'aria-labelledby': labelledBy = modalHeaderId,
    'aria-describedby': describedBy = modalBodyId,
  } = props

  return useMemo(() => {
    return {
      tabIndex,
      id,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    }
  }, [describedBy, id, labelledBy, tabIndex])
}

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const props = inProps as ModalContentProps
  const ctx = useModal()

  const [paused, setPaused] = useState(false)

  const modalManager = useModalManager()

  const { isTopmostModal } = ctx

  const ariaProps = useAriaProps(props)

  const [ModalContentRoot, getModalContentRootProps] = useSlot({
    style,
    elementType: 'section',
    externalForwardedProps: props,
    a11y: ariaProps,
  })

  useEffect(() => {
    const unsubscribe = modalManager.subscribe(() => {
      setPaused(!isTopmostModal?.())
    })

    return unsubscribe
  }, [isTopmostModal, modalManager])

  return (
    <FocusTrap
      active={ctx.open}
      restoreFocus={ctx.restoreFocus}
      paused={paused}
    >
      <ModalContentRoot {...getModalContentRootProps()} />
    </FocusTrap>
  )
}

ModalContent.displayName = 'ModalContent'
