import type { Theme } from '../types/theme'

export function defineTheme({
  aliases,
  scales,
  breakpoints,
  selectors,
  tokens,
  components,
  semanticTokens,
}: Theme): Theme {
  return {
    aliases,
    scales,
    breakpoints,
    selectors,
    tokens,
    semanticTokens,
    components,
  }
}
