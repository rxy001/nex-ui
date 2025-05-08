'use client'

import { createContext } from '@nex-ui/utils'
import type { AccordionGroupContextValue } from './types'

export const [AccordionGroupProvider, useAccordionGroup] =
  createContext<AccordionGroupContextValue>({
    contextName: 'AccordionGroupContext',
    hookName: 'useAccordionGroup',
    providerName: 'AccordionGroupProvider',
    defaultValue: {
      expandedKeys: [],
      toggleExpandedKey: () => {},
      keepMounted: true,
      hideIndicator: false,
      motionProps: {},
      disabledKeys: [],
      disabled: false,
      variant: 'underlined',
      indicatorMotionProps: {},
    },
    strict: true,
  })
