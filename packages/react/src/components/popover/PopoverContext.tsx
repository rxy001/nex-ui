'use client'

import { createContext } from '@nex-ui/utils'
import type { PopperRootProps } from '../popper'
import type { PopoverProps } from './types'

export type PopoverContextValue = PopperRootProps &
  Pick<PopoverProps, 'motionProps' | 'restoreFocus'>

export const [PopoverProvider, usePopover] = createContext<PopoverContextValue>(
  {
    contextName: 'PopoverContext',
    hookName: 'usePopover',
    providerName: 'PopoverProvider',
    strict: true,
    defaultValue: null as unknown as PopoverContextValue,
  },
)
