'use client'

import { createContext } from '@nex-ui/utils'
import type { CheckboxGroupContextValue } from './types'

export const [CheckboxGroupProvider, useCheckboxGroup] =
  createContext<CheckboxGroupContextValue>({
    contextName: 'CheckboxGroupContext',
    providerName: 'CheckboxGroupProvider',
    hookName: 'useCheckboxGroup',
    strict: false,
  })
