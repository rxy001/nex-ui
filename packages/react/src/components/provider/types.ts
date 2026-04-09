import type { ReactNode } from 'react'
import type { ColorSchemeProviderProps } from '@nex-ui/system'
import type { Theme } from '../../types/theme'

export type PrimaryThemeColor = Exclude<Theme['primaryThemeColor'], undefined>

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
  disableCascadeLayers?: boolean
  disablePreflight?: boolean
}
