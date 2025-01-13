import { createContext } from '@nex-ui/utils'
import type { CheckboxGroupContext } from './types'

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    contextName: 'CheckboxGroupContext',
    providerName: 'CheckboxGroupProvider',
    hookName: 'useCheckboxGroupContext',
    strict: false,
  })
