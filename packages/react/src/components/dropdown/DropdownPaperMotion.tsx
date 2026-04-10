'use client'

import * as m from 'motion/react-m'
import { useFadeInOutMotionProps, useScaleInOutMotionProps } from '../utils'
import type { DropdownPaperMotionProps } from './types'

export function DropdownPaperMotion({
  children,
  placement,
  motionProps,
  onAnimationStart,
  onAnimationComplete,
}: DropdownPaperMotionProps) {
  const props = useFadeInOutMotionProps(
    useScaleInOutMotionProps({
      ...motionProps,
      onAnimationStart: (animation) => {
        onAnimationStart?.(animation)
        motionProps?.onAnimationStart?.(animation)
      },
      onAnimationComplete: (animation) => {
        onAnimationComplete?.(animation)
        motionProps?.onAnimationComplete?.(animation)
      },
    }),
  )

  return (
    <m.div
      {...props}
      style={{
        transformOrigin: placement
          ? 'var(--popper-transform-origin)'
          : undefined,
        ...props?.style,
      }}
    >
      {children}
    </m.div>
  )
}

DropdownPaperMotion.displayName = 'DropdownPaperMotion'
