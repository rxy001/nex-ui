import { createContext } from '@nex-ui/utils'
import type { Key, ComponentType } from 'react'
import type { MotionProps } from 'motion/react'

type AccordionContextValue = {
  expandedKeys: Key[]
  toggleExpandedKey: (key: Key) => void
  keepMounted: boolean
  hideIndicator: boolean
  disabledExpandedKeys: Key[]
  disabled: boolean
  indicator?: ComponentType<any>
  motionProps?: MotionProps
  hideDivider: boolean
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
      hideDivider: false,
    },
    strict: true,
  })
