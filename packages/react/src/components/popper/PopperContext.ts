'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

export type PopperContextValue = {
  setOpen: (open: boolean) => void
  open: boolean
  referenceRef: RefObject<HTMLDivElement | null>
  popperRootRef: RefObject<HTMLDivElement | null>
  handleOpen: () => void
  handleClose: () => void
  popperRootId: string
}

export const [PopperProvider, usePopper] = createContext<PopperContextValue>({
  contextName: 'PopperPropsContext',
  hookName: 'usePopper',
  providerName: 'PopperProvider',
  strict: true,
  defaultValue: null as unknown as PopperContextValue,
})
