import type { ReactNode } from 'react'
import type { StylesFn, NormalizeFn } from '@nex-ui/system'
import type { BasicTheme, ComponentTheme } from '../../theme'

export type InnerProviderProps = {
  components?: ComponentTheme
  prefix: string
  children?: ReactNode
}

export type NexProviderProps = {
  theme?: BasicTheme
  components?: ComponentTheme
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  prefix: string
  components?: InnerProviderProps['components']
  styles: StylesFn
  normalize: NormalizeFn
}
