import type { ReactNode } from 'react'
import type { CssFn, ColorSchemeProviderProps } from '@nex-ui/system'
import type { Theme } from '../../types/theme'

type PrimaryThemeColor = Exclude<Theme['primaryThemeColor'], undefined>

export type InnerProviderProps = {
  prefix: string
  primaryThemeColor?: PrimaryThemeColor
  children?: ReactNode
  components?: Theme['components']
}

export interface NexUIProviderProps {
  theme?: Theme
  colorScheme?: Omit<ColorSchemeProviderProps, 'children'>
  children?: ReactNode
  prefix?: string
}

export type NexContextValue = {
  css: CssFn
  prefix: string
  primaryThemeColor: PrimaryThemeColor
  components?: Theme['components']
}
