'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

interface PopupContextValue {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  setOpen: (open: boolean) => void
  triggerRef?: RefObject<HTMLDivElement | null>
}

export const [PopupProvider, usePopup] = createContext<PopupContextValue>({
  contextName: 'PopupPropsContext',
  hookName: 'usePopup',
  providerName: 'PopupProvider',
  strict: true,
  defaultValue: null as unknown as PopupContextValue,
})
