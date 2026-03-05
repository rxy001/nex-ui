'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'

export interface PopperContextValue {
  open?: boolean
  setOpen: (open: boolean) => void
  triggerRef: RefObject<HTMLElement | null>
  popperRootRef: RefObject<HTMLDivElement | null>
}

export const [PopperProvider, usePopperContext] =
  createContext<PopperContextValue>({
    contextName: 'PopperContext',
    hookName: 'usePopperContext',
    providerName: 'PopperProvider',
    strict: true,
    defaultValue: null as unknown as PopperContextValue,
  })

export interface PopperPortalPropsContextValue {
  keepMounted: boolean
  disableAnimatePresence: boolean
}

export const [PopperPortalPropsProvider, usePopperPortalPropsContext] =
  createContext<PopperPortalPropsContextValue | null>({
    contextName: 'PopperPortalPropsContext',
    hookName: 'usePopperPortalPropsContext',
    providerName: 'PopperPortalPropsProvider',
    strict: false,
    defaultValue: null,
  })
