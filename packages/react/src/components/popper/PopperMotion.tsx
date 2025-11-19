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
  const { open } = usePopper()
  const { children, keepMounted = false, ...remainingProps } = props

  const [PopperMotionRoot, getPopperMotionRootProps] = useSlot({
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    externalForwardedProps: remainingProps,
    additionalProps: {
      open,
      keepMounted,
    },
    dataAttrs: {
      keepMounted,
    },
    a11y: { 'aria-hidden': open ? undefined : true },
  })

  return (
    <PopperMotionRoot {...getPopperMotionRootProps()}>
      {children}
    </PopperMotionRoot>
  )
}

PopperMotion.displayName = 'PopperMotion'
