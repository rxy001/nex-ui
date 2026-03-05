'use client'

import { usePopperContext, usePopperPortalPropsContext } from './PopperContext'
import { FadeInOutMotion } from '../fadeInOutMotion'
import type { PopperMotionProps } from './types'

export const PopperMotion = (props: PopperMotionProps) => {
  const { open } = usePopperContext()
  const { children, ...remainingProps } = props
  const popperPortalPropsCtx = usePopperPortalPropsContext()

  return (
    <FadeInOutMotion
      propagate
      open={open}
      keepMounted={popperPortalPropsCtx?.keepMounted}
      motionProps={remainingProps}
    >
      {children}
    </FadeInOutMotion>
  )
}

PopperMotion.displayName = 'PopperMotion'
