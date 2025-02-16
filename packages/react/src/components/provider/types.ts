import type { ReactNode } from 'react'
import type { CssFn, ColorSchemeProviderProps } from '@nex-ui/system'
import type { ComponentThemes } from '../../types/componentThemes'
import type { Theme } from '../../types/theme'
import type { colorVariant } from '../../theme/shared/colorVariant'

type Colors = keyof typeof colorVariant

export type InnerProviderProps = {
  prefix: string
  primaryColor: Colors
  children?: ReactNode
  components?: ComponentThemes
}

export interface NexUIProviderProps extends ColorSchemeProviderProps {
  theme?: Theme
  children?: ReactNode
  prefix?: string
  primaryColor?: Colors
}

export type NexContext = {
  css: CssFn
  prefix: string
  primaryColor: Colors
  components?: ComponentThemes
}
