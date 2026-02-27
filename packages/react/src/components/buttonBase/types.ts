import type { Interpolation } from '@nex-ui/system'
import type { JSX, ElementType } from 'react'

export type ButtonBaseProps = JSX.IntrinsicElements['button'] & {
  as?: ElementType
  sx?: Interpolation
  href?: string
}
