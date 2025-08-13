'use client'

import { createContext } from '@nex-ui/utils'
import type { RadioGroupContextValue } from './types'

export const [RadioGroupProvider, useRadioGroup] =
  createContext<RadioGroupContextValue | null>({
    strict: false,
    contextName: 'RadioGroupContext',
    hookName: 'useRadioGroup',
    providerName: 'RadioGroupProvider',
    defaultValue: null,
  })
