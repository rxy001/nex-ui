'use client'

import { PresenceMotion } from '../utils'
import { useModalContext, useModalPortalPropsContext } from './ModalContext'
import type { ModalMotionProps } from './types'

export const ModalMotion = (props: ModalMotionProps) => {
  const { open } = useModalContext()
  const modalPortalPropsCtx = useModalPortalPropsContext()
  const { children, ...remainingProps } = props

  return (
    <PresenceMotion
      propagate
      open={open}
      keepMounted={modalPortalPropsCtx?.keepMounted}
      {...remainingProps}
    >
      {children}
    </PresenceMotion>
  )
}

ModalMotion.displayName = 'ModalMotion'
