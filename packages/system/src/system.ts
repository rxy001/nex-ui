import { createCvaFn, createSvaFn } from './styles'
import { createTokens } from './tokens'
import { createScales } from './scales'
import { createAliases } from './aliases'
import { createBreakpoints } from './breakpoints'
import { createCssFn } from './css'
import { createNormalize } from './normalize'
import { createSelectors } from './selectors'
import type { ScalesDefinition } from './scales'
import type { TokensDefinition, SemanticTokensDefinition } from './tokens'
import type { AliasesDefinition } from './aliases'
import type { SelectorsDefinition } from './selectors'
import type { BreakpointsDefinition } from './breakpoints'

export type SystemConfig = {
  cssVarsPrefix?: string
  scales?: ScalesDefinition
  aliases?: AliasesDefinition
  breakpoints?: BreakpointsDefinition
  selectors?: SelectorsDefinition
  tokens?: TokensDefinition
  semanticTokens?: SemanticTokensDefinition
}

export const createSystem = (config: SystemConfig) => {
  const {
    cssVarsPrefix = 'system',
    scales = {},
    aliases = {},
    breakpoints = {},
    tokens = {},
    semanticTokens = {},
    selectors = {},
  } = config

  const { getToken, getGlobalCssVars } = createTokens({
    tokens,
    semanticTokens,
    prefix: cssVarsPrefix,
  })

  const { getPropertiesByAlias } = createAliases(aliases)

  const { getCategoryByProperty } = createScales(scales)

  const { getMediaSelectors } = createBreakpoints(breakpoints)

  const { getCustomizedSelector } = createSelectors({
    selectors,
    getMediaSelectors,
  })

  const normalize = createNormalize({
    getCategoryByProperty,
    getPropertiesByAlias,
    getToken,
  })

  const css = createCssFn({
    normalize,
    getCustomizedSelector,
  })

  // Class Variance Authority
  const cva = createCvaFn()

  const sva = createSvaFn()

  return {
    cva,
    css,
    sva,
    getGlobalCssVars,
  }
}
