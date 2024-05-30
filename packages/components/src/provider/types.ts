import type { ReactNode } from 'react'
import type { Tokens, BtnTokens } from '@nex-ui/theme'

export type ComponentTokens = {
  button: Partial<BtnTokens & Tokens>
  global: Partial<Tokens>
}

export type AntUIProviderProps = {
  theme?: Partial<ComponentTokens>
  children?: ReactNode
}

export type ComponentKey = keyof ComponentTokens
