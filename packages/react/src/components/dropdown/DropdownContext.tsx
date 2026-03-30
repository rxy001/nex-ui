import { createContext } from '@nex-ui/utils'
import type { Dispatch, SetStateAction } from 'react'
import type { DropdownContentProps } from './types'

export interface DropdownContextValue {
  open: boolean
}

export const [DropdownProvider, useDropdownContext] =
  createContext<DropdownContextValue>({
    contextName: 'DropdownContext',
    hookName: 'useDropdownContext',
    providerName: 'DropdownProvider',
    strict: true,
    defaultValue: null as unknown as DropdownContextValue,
  })

export interface SubDropdownContextValue {
  open: boolean
}

export const [SubDropdownProvider, useSubDropdownContext] =
  createContext<SubDropdownContextValue>({
    contextName: 'SubDropdownContext',
    hookName: 'useSubDropdownContext',
    providerName: 'SubDropdownProvider',
    strict: true,
    defaultValue: null as unknown as SubDropdownContextValue,
  })

export interface DropdownContentContextValue {
  indicatorsCount: number
  setIndicatorsCount: Dispatch<SetStateAction<number>>
  color: DropdownContentProps['color']
  variant: DropdownContentProps['variant']
  disableAnimation: DropdownContentProps['disableAnimation']
  radius: DropdownContentProps['radius']
  size: DropdownContentProps['size']
}

export const [DropdownContentProvider, useDropdownContentContext] =
  createContext<DropdownContentContextValue>({
    hookName: 'useDropdownContentContext',
    contextName: 'DropdownContentContext',
    providerName: 'DropdownContentProvider',
    strict: true,
    defaultValue: null as unknown as DropdownContentContextValue,
  })
