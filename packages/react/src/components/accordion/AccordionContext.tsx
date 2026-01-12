'use client'

import { createContext } from '@nex-ui/utils'
import type { Key, ReactNode } from 'react'
import type { HTMLMotionProps } from '../../types/utils'
import type { AccordionVariants } from '../../theme/recipes'

export interface AccordionGroupContextValue {
  expandedKeys: Key[]
  toggleExpandedKey: (key: Key) => void
  keepMounted: boolean
  hideIndicator: boolean
  disabledKeys: Key[]
  disabled: boolean
  disableAnimation: boolean
  indicator?: ReactNode
  motionProps?: HTMLMotionProps<'div'>
  variant: AccordionVariants['variant']
  indicatorMotionProps?: HTMLMotionProps<'span'>
}

export const [AccordionGroupProvider, useAccordionGroupContext] =
  createContext<AccordionGroupContextValue>({
    contextName: 'AccordionGroupContext',
    hookName: 'useAccordionGroupContext',
    providerName: 'AccordionGroupProvider',
    defaultValue: null as unknown as AccordionGroupContextValue,
    strict: true,
  })
