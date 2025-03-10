import type { CSSProperties } from 'react'
import type { HTMLMotionProps } from 'motion/react'

export type Ripples = {
  size: number
  x: number
  y: number
  key: string
}

export type RippleProps = {
  ripples: Ripples[]
  onClear: (key: string) => void
  color?: string
  motionProps?: HTMLMotionProps<'span'>
  style?: CSSProperties
}
