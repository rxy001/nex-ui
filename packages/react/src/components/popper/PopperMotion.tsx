'use client'

import { usePopper, usePopperPortalProps } from './PopperContext'
import { useSlot, PresenceMotion } from '../utils'
import type { PopperMotionProps } from './types'

export const PopperMotion = (props: PopperMotionProps) => {
  const { open } = usePopper()
  const { children, ...remainingProps } = props
  const { keepMounted } = usePopperPortalProps()

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
