'use client'

import { createContext } from '@nex-ui/utils'
import type { PopoverProps } from './types'
import type { PopperProps } from '../popper'

export type PopoverPropsContextValue = Omit<PopoverProps, keyof PopperProps>

export const [PopoverPropsProvider, usePopoverProps] =
  createContext<PopoverPropsContextValue>({
    contextName: 'PopoverPropsContext',
    hookName: 'usePopoverProps',
    providerName: 'PopoverPropsProvider',
    strict: true,
    defaultValue: null as unknown as PopoverPropsContextValue,
  })
