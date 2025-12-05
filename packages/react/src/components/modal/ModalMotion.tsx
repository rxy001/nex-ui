'use client'

import { useSlot, PresenceMotion } from '../utils'
import { useModal, useModalPortalProps } from './ModalContext'
import type { ModalMotionProps } from './types'

export const ModalMotion = (props: ModalMotionProps) => {
  const { open } = useModal()
  const { keepMounted } = useModalPortalProps()
  const { children, ...remainingProps } = props

  const [ModalMotionRoot, getModalMotionRootProps] = useSlot({
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      open,
      keepMounted,
    },
  })

  return (
    <ModalMotionRoot {...getModalMotionRootProps()}>{children}</ModalMotionRoot>
  )
}

ModalMotion.displayName = 'ModalMotion'
