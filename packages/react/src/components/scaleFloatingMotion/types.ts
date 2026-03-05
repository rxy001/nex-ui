import type { ReactNode } from 'react'
import type { Placement } from '../utils'
import type { HTMLMotionProps } from '../../types/utils'

export type ScaleFloatingMotionProps = {
  motionProps?:
    | ((placement: Placement) => HTMLMotionProps<'div'>)
    | HTMLMotionProps<'div'>
  placement?: Placement
  children?: ReactNode
}
