'use client'

import { useSlot, PresenceMotion } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { ModalMotionProps } from './types'

export const ModalMotion = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  props: ModalMotionProps<RootComponent>,
) => {
  const { open, keepMounted } = useModal()
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
