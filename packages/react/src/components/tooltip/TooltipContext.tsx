import { createContext } from '@nex-ui/utils'

export interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  delayOpen: () => void
  delayClose: () => void
}

export const [TooltipProvider, useTooltip] = createContext<TooltipContextValue>(
  {
    contextName: 'TooltipContext',
    hookName: 'useTooltip',
    providerName: 'TooltipProvider',
    strict: true,
    defaultValue: null as unknown as TooltipContextValue,
  },
)
