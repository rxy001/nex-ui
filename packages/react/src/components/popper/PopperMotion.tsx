'use client'

import { usePopper } from './PopperContext'
import { useSlot, PresenceMotion } from '../utils'
import type { PopperMotionProps } from './types'

export const PopperMotion = (props: PopperMotionProps) => {
  const { open, keepMounted } = usePopper()
  const { children, ...remainingProps } = props

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
