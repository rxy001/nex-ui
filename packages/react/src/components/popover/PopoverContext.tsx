'use client'

import { createContext } from '@nex-ui/utils'
import type { PopoverProps } from './types'
import type { PopperProps } from '../popper'
import type { RefObject } from 'react'

export type PopoverPropsContextValue = Omit<PopoverProps, keyof PopperProps>

export const [PopoverPropsProvider, usePopoverPropsContext] =
  createContext<PopoverPropsContextValue>({
    contextName: 'PopoverPropsContext',
    hookName: 'usePopoverPropsContext',
    providerName: 'PopoverPropsProvider',
    strict: true,
    defaultValue: null as unknown as PopoverPropsContextValue,
  })

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: RefObject<HTMLElement | null>
  rootId: string
}

export const [PopoverProvider, usePopoverContext] = createContext({
  contextName: 'PopoverContext',
  hookName: 'usePopoverContext',
  providerName: 'PopoverProvider',
  strict: true,
  defaultValue: null as unknown as PopoverContextValue,
})
