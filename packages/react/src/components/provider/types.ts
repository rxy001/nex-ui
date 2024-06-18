import type { ReactNode } from 'react'
import type { Tokens, BtnTokens } from '@theme'

export type ComponentTokens = {
  button: Partial<BtnTokens & Tokens>
  global: Partial<Tokens>
}

export type NexUIProviderProps = {
  theme?: Partial<ComponentTokens>
  children?: ReactNode
  prefix?: string
}

export type ComponentKey = keyof ComponentTokens
