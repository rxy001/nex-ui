import { createContext } from '@nex-ui/utils'

export interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  delayOpen: () => void
  delayClose: () => void
  rootId: string
}

export const [TooltipProvider, useTooltipContext] =
  createContext<TooltipContextValue>({
    contextName: 'TooltipContext',
    hookName: 'useTooltipContext',
    providerName: 'TooltipProvider',
    strict: true,
    defaultValue: null as unknown as TooltipContextValue,
  })
