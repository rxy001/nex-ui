'use client'

import { nex } from '@nex-ui/styled'
import { useId, useMemo } from 'react'
import { useSlotProps } from '../utils'
import { modalContentRecipe } from '../../theme/recipes'
import { ModalProvider, useModal } from './ModalContext'
import { FocusTrap } from '../focusTrap'
import type { ElementType } from 'react'
import type { ModalContentProps } from './types'

const style = modalContentRecipe()

const useAriaProps = (props: ModalContentProps) => {
  const { role = 'dialog', tabIndex = -1 } = props
  const labelledBy = props['aria-labelledby']
  const describedBy = props['aria-describedby']
  return useMemo(() => {
    return {
      role,
      tabIndex,
      'aria-modal': true,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    }
  }, [describedBy, labelledBy, role, tabIndex])
}

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const props = inProps as ModalContentProps
  const labelId = useId()
  const describtionId = useId()
  const modalState = useModal()
  const labelledBy =
    props['aria-labelledby'] ?? modalState['aria-labelledby'] ?? labelId
  const describedBy =
    props['aria-describedby'] ?? modalState['aria-describedby'] ?? describtionId

  const ariaProps = useAriaProps({
    ...props,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
  })

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    a11y: ariaProps,
  })

  const ctx = useMemo(
    () => ({
      ...modalState,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    }),
    [describedBy, labelledBy, modalState],
  )

  return (
    <ModalProvider value={ctx}>
      <FocusTrap
        active={modalState.open}
        restoreFocus={modalState.restoreFocus}
      >
        <nex.section {...rootProps} />
      </FocusTrap>
    </ModalProvider>
  )
}

ModalContent.displayName = 'ModalContent'
