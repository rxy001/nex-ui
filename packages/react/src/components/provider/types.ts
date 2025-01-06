import type { ReactNode } from 'react'
import type { CssFn, ColorSchemeProviderProps } from '@nex-ui/system'
import type { ComponentsTheme } from '../../types/componentsTheme'
import type { Theme } from '../../types/theme'

export type InnerProviderProps = {
  prefix: string
  children?: ReactNode
  components?: ComponentsTheme
}

export interface NexProviderProps extends ColorSchemeProviderProps {
  theme?: Theme
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  css: CssFn
  prefix: string
  components?: ComponentsTheme
}
