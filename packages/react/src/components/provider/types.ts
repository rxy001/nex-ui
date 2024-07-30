import type { ReactNode } from 'react'
import type { ThemeConfig } from '@theme'
import type { StylesFn, NormalizeFn } from '@nex-ui/system'

export type InnerProviderProps = {
  components?: ThemeConfig['components']
  prefix: string
  children?: ReactNode
}

export type NexProviderProps = {
  theme?: ThemeConfig
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  prefix: string
  components?: InnerProviderProps['components']
  styles: StylesFn
  normalize: NormalizeFn
}
