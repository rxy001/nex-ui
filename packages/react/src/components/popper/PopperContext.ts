'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'
import type { PopperPortalProps } from './types'

export interface PopperContextValue {
  open?: boolean
  setOpen: (open: boolean) => void
  referenceRef: RefObject<HTMLDivElement | null>
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
  container: PopperPortalProps['container']
  keepMounted: boolean
  disableAnimation: boolean
}

export const [PopperPortalPropsProvider, usePopperPortalPropsContext] =
  createContext<PopperPortalPropsContextValue>({
    contextName: 'PopperPortalPropsContext',
    hookName: 'usePopperPortalPropsContext',
    providerName: 'PopperPortalPropsProvider',
    strict: true,
    defaultValue: null as unknown as PopperPortalPropsContextValue,
  })
