'use client'

import { createContext } from '@nex-ui/utils'
import type { PopoverProps } from './types'
import type { PopperProps } from '../popper'

export type PopoverContextValue = Omit<PopoverProps, keyof PopperProps>

export const [PopoverProvider, usePopover] = createContext<PopoverContextValue>(
  {
    contextName: 'PopoverContext',
    hookName: 'usePopover',
    providerName: 'PopoverProvider',
    strict: true,
    defaultValue: null as unknown as PopoverContextValue,
  },
)
