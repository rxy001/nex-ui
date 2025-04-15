'use client'

import { createContext } from '@nex-ui/utils'
import type { Key, ComponentType } from 'react'
import type { MotionProps } from 'motion/react'
import type { AccordionItemVariants } from '../../theme/recipes'

type AccordionContextValue = {
  expandedKeys: Key[]
  toggleExpandedKey: (key: Key) => void
  keepMounted: boolean
  hideIndicator: boolean
  disabledExpandedKeys: Key[]
  disabled: boolean
  indicator?: ComponentType<any>
  motionProps?: MotionProps
  variant: AccordionItemVariants['variant']
}

export const [AccordionProvider, useAccordion] =
  createContext<AccordionContextValue>({
    contextName: 'AccordionContext',
    hookName: 'useAccordionContext',
    providerName: 'AccordionProvider',
    defaultValue: {
      expandedKeys: [],
      toggleExpandedKey: () => {},
      keepMounted: true,
      hideIndicator: false,
      motionProps: {},
      disabledExpandedKeys: [],
      disabled: false,
      variant: 'underlined',
    },
    strict: true,
  })
