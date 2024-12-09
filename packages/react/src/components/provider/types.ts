import type { ReactNode } from 'react'
import type { SystemContext, ColorSchemeProviderProps } from '@nex-ui/system'
import type { ComponentsTheme } from '../../theme/types/componentsTheme'
import type { Theme } from '../../theme/defineTheme'

export type InnerProviderProps = {
  components?: ComponentsTheme
  prefix: string
  children?: ReactNode
}

export interface NexProviderProps extends ColorSchemeProviderProps {
  theme?: Theme
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  prefix: string
  components?: InnerProviderProps['components']
  css: SystemContext['css']
}
