'use client'

import * as m from 'motion/react-m'
import { useScaleInOutMotionProps } from './useScaleInOutMotionProps'
import type { HTMLMotionProps } from 'motion/react'

export const ScaleInOutMotion = ({
  children,
  ...props
}: HTMLMotionProps<'div'>) => {
  const motionProps = useScaleInOutMotionProps(props)

  return <m.div {...motionProps}>{children}</m.div>
}

ScaleInOutMotion.displayName = 'ScaleInOutMotion'
