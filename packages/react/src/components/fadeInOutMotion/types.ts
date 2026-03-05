import type { MotionValue } from 'motion/react'
import type { ReactNode } from 'react'
import type { HTMLMotionProps } from '../../types/utils'

export interface FadeInOutMotionProps {
  keepMounted?: boolean
  children?: ReactNode | MotionValue<string> | MotionValue<number>
  open?: boolean
  propagate?: boolean
  motionProps?: HTMLMotionProps<'div'>
}
