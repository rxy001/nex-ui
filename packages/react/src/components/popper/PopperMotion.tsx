'use client'

import { usePopperContext, usePopperPortalPropsContext } from './PopperContext'
import { PresenceMotion } from '../utils'
import type { PopperMotionProps } from './types'

export const PopperMotion = (props: PopperMotionProps) => {
  const { open } = usePopperContext()
  const { children, ...remainingProps } = props
  const popperPortalPropsCtx = usePopperPortalPropsContext()

  return (
    <PresenceMotion
      propagate
      open={open}
      keepMounted={popperPortalPropsCtx?.keepMounted}
      {...remainingProps}
    >
      {children}
    </PresenceMotion>
  )
}

PopperMotion.displayName = 'PopperMotion'
