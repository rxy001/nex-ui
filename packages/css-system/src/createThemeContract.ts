import { walkObject } from '@vanilla-extract/private'
import type { Tokens, NullableTokens, ThemeVars, Normalize } from './types'

export function createThemeContract<ThemeTokens extends Tokens>(
  tokens: ThemeTokens,
): ThemeVars<ThemeTokens>
export function createThemeContract<ThemeTokens extends NullableTokens>(
  tokens: ThemeTokens,
  mapFn: Normalize,
): ThemeVars<ThemeTokens>
export function createThemeContract(
  tokens: Tokens | NullableTokens,
  mapFn?: Normalize | undefined,
) {
  return walkObject(tokens, (value, path) => {
    const rawVarName =
      typeof mapFn === 'function'
        ? mapFn(value as string | null, path)
        : (value as string)

    const varName =
      typeof rawVarName === 'string' ? rawVarName.replace(/^--/, '') : null

    if (typeof varName !== 'string') {
      throw new Error(
        `Invalid variable name for "${path.join('.')}": ${varName}`,
      )
    }

    return `var(--${varName})`
  })
}
