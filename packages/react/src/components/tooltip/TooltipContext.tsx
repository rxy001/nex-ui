import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

export interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  delayOpen: () => void
  delayClose: () => void
  rootId: string
  triggerRef: RefObject<HTMLElement | null>
}

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>({
    contextName: 'TooltipContext',
    hookName: 'useTooltipContext',
    providerName: 'TooltipProvider',
    strict: true,
    defaultValue: null as unknown as TooltipContextValue,
  })
