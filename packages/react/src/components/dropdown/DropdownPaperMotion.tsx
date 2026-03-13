'use client'

import * as m from 'motion/react-m'
import { useFadeInOutMotionProps, useScaleInOutMotionProps } from '../utils'
import { useDropdownContext } from './DropdownContext'
import type { DropdownPaperMotionProps } from './types'

export const DropdownPaperMotion = ({
  children,
  placement,
  motionProps,
  onAnimationStart,
  onAnimationComplete,
}: DropdownPaperMotionProps) => {
  const { open } = useDropdownContext()

  const resolvedProps =
    typeof motionProps === 'function' ? motionProps(placement) : motionProps

  const props = useFadeInOutMotionProps(
    useScaleInOutMotionProps({
      initial: 'initial',
      animate: open ? 'visible' : 'hidden',
      ...resolvedProps,
      variants: {
        initial: {
          scale: 0.96,
          opacity: 0,
          ...resolvedProps?.variants?.initial,
        },
        hidden: {
          scale: 1,
          ...resolvedProps?.variants?.hidden,
        },
      },
      onAnimationStart: (animation) => {
        onAnimationStart?.(animation)
        resolvedProps?.onAnimationStart?.(animation)
      },
      onAnimationComplete: (animation) => {
        onAnimationComplete?.(animation)
        resolvedProps?.onAnimationComplete?.(animation)
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
