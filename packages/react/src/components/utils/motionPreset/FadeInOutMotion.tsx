'use client'

import * as m from 'motion/react-m'
import { useFadeInOutMotionProps } from './useFadeInOutMotionProps'
import type { HTMLMotionProps } from 'motion/react'

export const FadeInOutMotion = ({
  children,
  ...props
}: HTMLMotionProps<'div'>) => {
  const motionProps = useFadeInOutMotionProps(props)

  return <m.div {...motionProps}>{children}</m.div>
}

FadeInOutMotion.displayName = 'FadeInOutMotion'
