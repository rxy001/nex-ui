import { createContext } from '@nex-ui/utils'
import type { DisclosureRootState } from './DisclosureRoot'

export interface DisclosureRootContextValue {
  open: boolean
  disabled: boolean
  setOpen: (open: boolean) => void
  panelId: string | undefined
  setPanelId: React.Dispatch<React.SetStateAction<string | undefined>>
  state: DisclosureRootState
}

export const [DisclosureRootProvider, useDisclosureRootContext] =
  createContext<DisclosureRootContextValue>({})
