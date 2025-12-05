'use client'

import { createContext } from '@nex-ui/utils'
import type { PopoverProps } from './types'
import type { PopperProps } from '../popper'

export type PopoverRootPropsContextValue = Omit<PopoverProps, keyof PopperProps>

export const [PopoverRootPropsProvider, usePopoverRootProps] =
  createContext<PopoverRootPropsContextValue>({
    contextName: 'PopoverRootPropsContext',
    hookName: 'usePopoverRootProps',
    providerName: 'PopoverRootPropsProvider',
    strict: true,
    defaultValue: null as unknown as PopoverRootPropsContextValue,
  })
