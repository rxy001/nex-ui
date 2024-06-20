import type { Contract, MapLeafNodes } from '@vanilla-extract/private'
import { registerClassName } from '@vanilla-extract/css/adapter'
import { generateIdentifier } from '@vanilla-extract/css'
import { getFileScope } from '@vanilla-extract/css/fileScope'
import type { Tokens, ThemeVars, Normalize } from './types'
import { createGlobalTheme } from './createGlobalTheme'

export function createTheme<ThemeTokens extends Tokens>(
  tokens: ThemeTokens,
  mapFn?: Normalize,
): [className: string, vars: ThemeVars<ThemeTokens>]
export function createTheme<ThemeContract extends Contract>(
  themeContract: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string>,
  mapFn?: Normalize,
): string
export function createTheme(arg1: any, arg2?: any, arg3?: any): any {
  const themeClassName = generateIdentifier(
    typeof arg2 === 'object' ? arg2 : arg1,
  )

  registerClassName(themeClassName, getFileScope())

  const vars =
    typeof arg2 === 'object'
      ? createGlobalTheme(themeClassName, arg1, arg2, arg3)
      : createGlobalTheme(themeClassName, arg1, arg2)

  return vars ? [themeClassName, vars] : themeClassName
}
