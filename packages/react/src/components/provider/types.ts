import type { ReactNode } from 'react'
import type { GlobalTokens, BtnTokens } from '@theme'

export type ComponentTokens = {
  button: Partial<BtnTokens & GlobalTokens>
  global: Partial<GlobalTokens>
}

export type NexUIProviderProps = {
  theme?: Partial<ComponentTokens>
  children?: ReactNode
  prefix?: string
}

export type ComponentKey = keyof ComponentTokens
