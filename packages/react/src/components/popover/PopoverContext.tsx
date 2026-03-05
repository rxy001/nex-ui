'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: RefObject<HTMLElement | null>
  rootId: string
}

export const [PopoverProvider, usePopoverContext] = createContext({
  contextName: 'PopoverContext',
  hookName: 'usePopoverContext',
  providerName: 'PopoverProvider',
  strict: true,
  defaultValue: null as unknown as PopoverContextValue,
})
