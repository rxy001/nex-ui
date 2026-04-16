'use client'

import { createContext } from '@nex-ui/utils'
import type { RadioVariants } from '../../themes/recipes'

export interface RadioGroupContextValue {
  setValue: (value: string) => void
  isChecked: (value?: string) => boolean
  name?: string
  disabled?: boolean
  color?: RadioVariants['color']
  size?: RadioVariants['size']
  disableAnimation: boolean
}

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextValue | null>({
    strict: false,
    contextName: 'RadioGroupContext',
    hookName: 'useRadioGroupContext',
    providerName: 'RadioGroupProvider',
    defaultValue: null,
  })
