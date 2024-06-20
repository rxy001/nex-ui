import type { Contract, MapLeafNodes } from '@vanilla-extract/private'
import { appendCss } from '@vanilla-extract/css/adapter'
import { assignVars } from '@vanilla-extract/css'
import { getFileScope } from '@vanilla-extract/css/fileScope'
import type { Tokens, Normalize, ThemeVars } from './types'
import { createThemeContract } from './createThemeContract'

export function createGlobalTheme<ThemeTokens extends Tokens>(
  selector: string,
  tokens: ThemeTokens,
): ThemeVars<ThemeTokens>
export function createGlobalTheme<ThemeTokens extends Tokens>(
  selector: string,
  tokens: ThemeTokens,
  mapFn: Normalize,
): ThemeVars<ThemeTokens>
export function createGlobalTheme<ThemeContract extends Contract>(
  selector: string,
  themeContract: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string>,
  mapFn?: Normalize,
): void
export function createGlobalTheme<ThemeContract extends Contract>(
  selector: string,
  themeContract: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string>,
  mapFn: Normalize,
): void
export function createGlobalTheme(
  selector: string,
  arg2: any,
  arg3?: any,
  arg4?: any,
): any {
  let contract = null as unknown as Contract
  let tokens = null as unknown as Tokens
  let mapFn = null as unknown as Normalize
  if (typeof arg4 === 'function') {
    contract = arg2
    tokens = arg3
    mapFn = arg4
  } else if (typeof arg3 === 'function') {
    tokens = arg2
    mapFn = arg3
  } else if (typeof arg3 === 'object') {
    contract = arg2
    tokens = arg3
  } else {
    tokens = arg2
  }

  const shouldCreateVars = Boolean(!contract)

  const themeVars = shouldCreateVars
    ? createThemeContract(tokens, mapFn)
    : contract

  appendCss(
    {
      selector,
      type: 'global',
      rule: { vars: assignVars(themeVars, tokens as any) },
    },
    getFileScope(),
  )
  if (shouldCreateVars) {
    return themeVars
  }
}
