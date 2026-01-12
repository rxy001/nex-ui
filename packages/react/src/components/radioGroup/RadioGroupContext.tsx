'use client'

import { createContext } from '@nex-ui/utils'
import type { RadioState } from './types'
import type { RadioVariants } from '../../theme/recipes'

export interface RadioGroupContextValue<
  T extends string | number = string | number,
> {
  setValue: (value: T) => void
  isChecked: (value?: T) => boolean
  isTabbable: (value?: T) => boolean
  name?: string
  disabled?: boolean
  color?: RadioVariants['color']
  size?: RadioVariants['size']
  setGroupState: (radio: RadioState) => void
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
