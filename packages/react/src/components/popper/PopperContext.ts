'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'
import type { PopperPortalProps } from './types'

export interface PopperContextValue {
  setOpen: (open: boolean) => void
  open: boolean
  referenceRef: RefObject<HTMLDivElement | null>
  popperRootRef: RefObject<HTMLDivElement | null>
  delayOpen: () => void
  delayClose: () => void
}

export const [PopperProvider, usePopper] = createContext<PopperContextValue>({
  contextName: 'PopperContext',
  hookName: 'usePopper',
  providerName: 'PopperProvider',
  strict: true,
  defaultValue: null as unknown as PopperContextValue,
})

export interface PopperPortalPropsContextValue {
  container: PopperPortalProps['container']
  keepMounted: boolean
  disableAnimation: boolean
}

export const [PopperPortalPropsProvider, usePopperPortalProps] =
  createContext<PopperPortalPropsContextValue>({
    contextName: 'PopperPortalPropsContext',
    hookName: 'usePopperPortalProps',
    providerName: 'PopperPortalPropsProvider',
    strict: true,
    defaultValue: null as unknown as PopperPortalPropsContextValue,
  })
