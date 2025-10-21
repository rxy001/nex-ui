'use client'

import { createContext } from '@nex-ui/utils'
import type { RefObject } from 'react'
import type { PopperProps } from './types'

export type PopperContextValue = {
  setOpen: (open: boolean) => void
  referenceRef: RefObject<HTMLDivElement | null>
  popperRootRef: RefObject<HTMLDivElement | null>
  arrowRef: RefObject<HTMLDivElement | null>
  showPopper: () => void
  hidePopper: () => void
  popperRootId: string
} & Pick<
  PopperProps,
  | 'flip'
  | 'shift'
  | 'container'
  | 'offset'
  | 'placement'
  | 'open'
  | 'closeOnEscape'
  | 'keepMounted'
  | 'openDelay'
  | 'closeDelay'
  | 'showArrow'
>

export const [PopperProvider, usePopper] = createContext<PopperContextValue>({
  contextName: 'PopperPropsContext',
  hookName: 'usePopper',
  providerName: 'PopperProvider',
  strict: true,
  defaultValue: null as unknown as PopperContextValue,
})
