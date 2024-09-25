import type { ReactNode } from 'react'
import type { CvaFn, CssFn } from '@nex-ui/system'
import type { BasicTheme, ComponentsTheme } from '../../theme'

export type InnerProviderProps = {
  components?: ComponentsTheme
  prefix: string
  children?: ReactNode
}

export type NexProviderProps = {
  theme?: BasicTheme
  components?: ComponentsTheme
  children?: ReactNode
  prefix?: string
}

export type NexContext = {
  prefix: string
  components?: InnerProviderProps['components']
  sys: {
    cva: CvaFn
    css: CssFn
  }
}
