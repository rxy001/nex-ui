import type { Interpolation } from '@nex-ui/system'
import type { ElementType, JSX } from 'react'

type PrimitiveInputProps = JSX.IntrinsicElements['input']

export interface InputBaseProps extends PrimitiveInputProps {
  as?: ElementType
  sx?: Interpolation
  invalid?: boolean
  onCheckedChange?: (checked: boolean) => void
}
