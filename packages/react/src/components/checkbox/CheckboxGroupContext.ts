'use client'

import { createContext } from '@nex-ui/utils'
import type { CheckboxVariants } from '../../theme/recipes'

export interface CheckboxGroupContextValue<
  T extends number | string = number | string,
> {
  toggleValue: (value: T) => void
  isChecked: (value?: T) => boolean
  name?: string
  disabled?: boolean
  color?: CheckboxVariants['color']
  size?: CheckboxVariants['size']
  radius?: CheckboxVariants['radius']
  disableAnimation?: boolean
}

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContextValue | null>({
    contextName: 'CheckboxGroupContext',
    providerName: 'CheckboxGroupProvider',
    hookName: 'useCheckboxGroupContext',
    strict: false,
    defaultValue: null,
  })
