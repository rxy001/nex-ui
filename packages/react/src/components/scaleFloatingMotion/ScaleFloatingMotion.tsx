import { useMemo } from 'react'
import * as m from 'motion/react-m'
import { LazyMotion } from 'motion/react'
import { motionFeatures } from '../utils'
import type { Variants } from 'motion/react'
import type { ScaleFloatingMotionProps } from './types'

const transformOrigins = {
  top: 'bottom center',
  right: 'center left',
  bottom: 'top center',
  left: 'center right',
  'top-start': 'bottom left',
  'right-end': 'bottom left',
  'right-start': 'top left',
  'bottom-start': 'top left',
  'bottom-end': 'top right',
  'left-start': 'top right',
  'left-end': 'bottom right',
  'top-end': 'bottom right',
}

export function ScaleFloatingMotion({
  children,
  motionProps,
  placement = 'bottom',
}: ScaleFloatingMotionProps) {
  const mergedMotionProps = useMemo(() => {
    const mProps =
      typeof motionProps === 'function' ? motionProps(placement) : motionProps

    const transformOrigin = placement ? (transformOrigins[placement] ?? '') : ''

    const variants: Variants = {
      visible: {
        transformOrigin,
        transform: 'scale(1)',
      },
      hidden: {
        transformOrigin,
        transform: 'scale(0.9)',
      },
    }

    return {
      variants,
      ...mProps,
    }
  }, [motionProps, placement])

  return (
    <LazyMotion features={motionFeatures}>
      <m.div {...mergedMotionProps}>{children}</m.div>
    </LazyMotion>
  )
}

ScaleFloatingMotion.displayName = 'ScaleFloatingMotion'
