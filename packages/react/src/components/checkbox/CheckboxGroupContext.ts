'use client'

import { createContext } from '@nex-ui/utils'
import type { CheckboxVariants } from '../../themes/recipes'

export interface CheckboxGroupContextValue {
  toggleValue: (value: string) => void
  isChecked: (value?: string) => boolean
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
