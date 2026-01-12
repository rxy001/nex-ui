'use client'

import { usePopperContext, usePopperPortalPropsContext } from './PopperContext'
import { useSlot, PresenceMotion } from '../utils'
import type { PopperMotionProps } from './types'

export const PopperMotion = (props: PopperMotionProps) => {
  const { open } = usePopperContext()
  const { children, ...remainingProps } = props
  const { keepMounted } = usePopperPortalPropsContext()

  const [PopperMotionRoot, getPopperMotionRootProps] = useSlot({
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      open,
      keepMounted,
    },
  })

  return (
    <PopperMotionRoot {...getPopperMotionRootProps()}>
      {children}
    </PopperMotionRoot>
  )
}

PopperMotion.displayName = 'PopperMotion'
