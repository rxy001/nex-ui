import * as m from 'motion/react-m'
import { useFadeInOutMotionProps, useScaleInOutMotionProps } from '../utils'
import { useTooltipContext } from './TooltipContext'
import type { TooltipPaperMotionProps } from './types'

export function TooltipPaperMotion({
  children,
  placement,
  motionProps,
  onAnimationStart,
  onAnimationComplete,
}: TooltipPaperMotionProps) {
  const { open } = useTooltipContext()

  const props = useFadeInOutMotionProps(
    useScaleInOutMotionProps({
      animate: open ? 'visible' : 'hidden',
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

TooltipPaperMotion.displayName = 'TooltipPaperMotion'
