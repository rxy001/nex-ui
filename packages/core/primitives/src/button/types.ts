import type { Interpolation } from '@nex-ui/system'
import type { ComponentProps, ElementType } from 'react'
import type { Overwrite } from '../../types/utils'

export type ButtonBaseProps<RootComponent extends ElementType = 'button'> =
  Overwrite<
    ComponentProps<RootComponent>,
    {
      as?: RootComponent
      sx?: Interpolation
      href?: string
      disabled?: boolean
    }
  >
