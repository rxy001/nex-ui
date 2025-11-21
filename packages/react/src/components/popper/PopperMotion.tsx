'use client'

import { usePopper } from './PopperContext'
import { useSlot, PresenceMotion } from '../utils'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { PopperMotionProps } from './types'

export const PopperMotion = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  props: PopperMotionProps<RootComponent>,
) => {
  const { open, keepMountedRef } = usePopper()
  const { children, ...remainingProps } = props

  const [PopperMotionRoot, getPopperMotionRootProps] = useSlot({
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      open,
      keepMounted: keepMountedRef.current,
    },
  })

  return (
    <PopperMotionRoot {...getPopperMotionRootProps()}>
      {children}
    </PopperMotionRoot>
  )
}

PopperMotion.displayName = 'PopperMotion'
