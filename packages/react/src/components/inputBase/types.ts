import type { Interpolation } from '@nex-ui/system'
import type { ElementType, InputHTMLAttributes, DetailedHTMLProps } from 'react'
import type { Overwrite } from '../../types/utils'

export type InputBaseProps = Overwrite<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  {
    as?: ElementType
    sx?: Interpolation
    invalid?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>
