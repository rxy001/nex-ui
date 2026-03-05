'use client'

import { FadeInOutMotion } from '../fadeInOutMotion'
import { useModalContext, useModalPortalPropsContext } from './ModalContext'
import type { ModalMotionProps } from './types'

export const ModalMotion = (props: ModalMotionProps) => {
  const { open } = useModalContext()
  const modalPortalPropsCtx = useModalPortalPropsContext()
  const { children, ...remainingProps } = props

  return (
    <FadeInOutMotion
      propagate
      open={open}
      keepMounted={modalPortalPropsCtx?.keepMounted}
      motionProps={remainingProps}
    >
      {children}
    </FadeInOutMotion>
  )
}

ModalMotion.displayName = 'ModalMotion'
