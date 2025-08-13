'use client'

import { nex } from '@nex-ui/styled'
import { useEffect, useId, useMemo, useState } from 'react'
import { useSlotProps } from '../utils'
import { modalContentRecipe } from '../../theme/recipes'
import { ModalProvider, useModal } from './ModalContext'
import { FocusTrap } from '../focusTrap'
import { useModalManager } from './ModalManager'
import { MODAL_INTERNAL_ID_PREFIX } from './constants'
import type { ElementType } from 'react'
import type { ModalContentProps } from './types'

const style = modalContentRecipe()

const useAriaProps = (props: ModalContentProps) => {
  const labelId = useId()
  const descriptionId = useId()

  const {
    tabIndex = -1,
    'aria-labelledby': labelledBy = `${MODAL_INTERNAL_ID_PREFIX}${labelId}`,
    'aria-describedby':
      describedBy = `${MODAL_INTERNAL_ID_PREFIX}${descriptionId}`,
  } = props

  return useMemo(() => {
    return {
      tabIndex,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    }
  }, [describedBy, labelledBy, tabIndex])
}

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const props = inProps as ModalContentProps

  const [paused, setPaused] = useState(false)

  const modalManager = useModalManager()
  const modalState = useModal()

  const { isTopmostModal } = modalState

  const ariaProps = useAriaProps(props)

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    a11y: ariaProps,
  })

  const ctx = useMemo(
    () => ({
      ...modalState,
      'aria-labelledby': ariaProps['aria-labelledby'],
      'aria-describedby': ariaProps['aria-describedby'],
    }),
    [ariaProps, modalState],
  )

  useEffect(() => {
    const unsubscribe = modalManager.subscribe(() => {
      setPaused(!isTopmostModal?.())
    })

    return unsubscribe
  }, [isTopmostModal, modalManager])

  return (
    <ModalProvider value={ctx}>
      <FocusTrap
        active={modalState.open}
        restoreFocus={modalState.restoreFocus}
        paused={paused}
      >
        <nex.section {...rootProps} />
      </FocusTrap>
    </ModalProvider>
  )
}

ModalContent.displayName = 'ModalContent'
