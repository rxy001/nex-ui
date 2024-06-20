import type { CSSVarFunction, MapLeafNodes } from '@vanilla-extract/private'

export type Tokens = {
  [key: string]: string | Tokens
}

export type NullableTokens = {
  [key: string]: string | NullableTokens | null
}

export type ThemeVars<ThemeContract extends NullableTokens> = MapLeafNodes<
  ThemeContract,
  CSSVarFunction
>

export type Normalize = (value: string | null, path: Array<string>) => string
