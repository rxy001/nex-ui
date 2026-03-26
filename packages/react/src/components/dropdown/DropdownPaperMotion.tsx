'use client'

import * as m from 'motion/react-m'
import { useFadeInOutMotionProps, useScaleInOutMotionProps } from '../utils'
import { useDropdownContext } from './DropdownContext'
import type { DropdownPaperMotionProps } from './types'

export function DropdownPaperMotion({
  children,
  placement,
  motionProps,
  onAnimationStart,
  onAnimationComplete,
}: DropdownPaperMotionProps) {
  const { open } = useDropdownContext()

  const props = useFadeInOutMotionProps(
    useScaleInOutMotionProps({
      initial: 'initial',
      animate: open ? 'visible' : 'hidden',
      ...motionProps,
      variants: {
        ...motionProps?.variants,
        initial: {
          scale: 0.96,
          opacity: 0,
          ...motionProps?.variants?.initial,
        },
        hidden: {
          scale: 1,
          ...motionProps?.variants?.hidden,
        },
      },
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
