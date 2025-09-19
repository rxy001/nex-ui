'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

interface PopperContextValue {
  open?: boolean
  defaultOpen?: boolean
  setOpen: (open: boolean) => void
  triggerRef: RefObject<HTMLDivElement | null>
  hasArrowRef: RefObject<boolean>
}

export const [PopperProvider, usePopper] = createContext<PopperContextValue>({
  contextName: 'PopperPropsContext',
  hookName: 'usePopper',
  providerName: 'PopperProvider',
  strict: true,
  defaultValue: null as unknown as PopperContextValue,
})
