import { assignInlineVars } from '@vanilla-extract/dynamic'
import { globalTokens } from '../globalTokens.css'
import type { Tokens } from '../globalTokens.css'

export const dynamicVars = <
  ComponentTokens extends Record<string, string>,
  ComponentTheme extends Record<string, string>,
>(
  componentTokens: ComponentTokens,
  componentTheme?: ComponentTheme,
) => {
  if (!componentTheme) {
    return undefined
  }

  const style: Record<string, string> = {}

  Object.keys(componentTheme).forEach((key) => {
    const value = componentTheme[key]
    style[componentTokens[key] ?? globalTokens[key as keyof Tokens]] = value
  })

  return assignInlineVars(style)
}
