'use client'

import { createContext } from '@nex-ui/utils'
import type { AccordionGroupContextValue } from './types'

export const [AccordionGroupProvider, useAccordionGroup] =
  createContext<AccordionGroupContextValue>({
    contextName: 'AccordionGroupContext',
    hookName: 'useAccordionGroup',
    providerName: 'AccordionGroupProvider',
    defaultValue: null as unknown as AccordionGroupContextValue,
    strict: true,
  })
