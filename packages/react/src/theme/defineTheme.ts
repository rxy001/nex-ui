import { merge } from '@nex-ui/utils'
import { defaultConfig } from './preset'
import type { Theme } from '../types/theme'
import type { Scales } from '../types/generated/scales'

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
    aliases: {
      ...aliases,
      ...defaultConfig.aliases,
    },
    scales: {
      ...scales,
      ...(defaultConfig.scales as Scales),
    },
    breakpoints: {
      ...defaultConfig.scales,
      ...breakpoints,
    },
    selectors: {
      ...defaultConfig.selectors,
      ...selectors,
    },
    tokens: merge({}, defaultConfig.tokens, tokens),
    semanticTokens: merge({}, defaultConfig.semanticTokens, semanticTokens),
    components,
  }
}
