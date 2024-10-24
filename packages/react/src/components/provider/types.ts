import type { ReactNode } from 'react'
import type { SystemContext } from '@nex-ui/system'
import type { ComponentsTheme } from '../../theme/componentsTheme.types'
import type { Theme } from '../../theme/defineTheme'

export type InnerProviderProps = {
  components?: ComponentsTheme
  prefix: string
  children?: ReactNode
}

export type NexProviderProps = {
  theme?: Theme
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  prefix: string
  components?: InnerProviderProps['components']
  sys: SystemContext
}
