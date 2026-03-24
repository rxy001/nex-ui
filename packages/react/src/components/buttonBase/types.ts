import type { Interpolation } from '@nex-ui/system'
import type { JSX, ElementType } from 'react'

type PrimitiveButtonProps = JSX.IntrinsicElements['button']

export interface ButtonBaseProps extends PrimitiveButtonProps {
  as?: ElementType
  sx?: Interpolation
  href?: string
}
