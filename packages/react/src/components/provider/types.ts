import type { ReactNode } from 'react'
import type { CssFn, ColorSchemeProviderProps } from '@nex-ui/system'
import type { ComponentsTheme } from '../../types/componentsTheme'
import type { Theme } from '../../types/theme'
import type { colorVariant } from '../../theme/recipes/shared/colorVariant'

type Colors = keyof typeof colorVariant

export type InnerProviderProps = {
  prefix: string
  primaryColor: Colors
  children?: ReactNode
  components?: ComponentsTheme
}

export interface NexProviderProps extends ColorSchemeProviderProps {
  theme?: Theme
  children?: ReactNode
  prefix?: string
  primaryColor?: Colors
}

export type NexContext = {
  css: CssFn
  prefix: string
  primaryColor: Colors
  components?: ComponentsTheme
}
