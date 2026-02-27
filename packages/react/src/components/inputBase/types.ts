import type { Interpolation } from '@nex-ui/system'
import type { ElementType, JSX } from 'react'

export type InputBaseProps = JSX.IntrinsicElements['input'] & {
  as?: ElementType
  sx?: Interpolation
  invalid?: boolean
  onCheckedChange?: (checked: boolean) => void
}
