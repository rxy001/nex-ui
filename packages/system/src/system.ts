import { isCSSProperty } from '@nex-ui/utils'
import { createTokens } from './tokens'
import { createScales } from './scales'
import { createAliases } from './aliases'
import { createBreakpoints } from './breakpoints'
import { createCssFn } from './css'
import { createNormalize } from './normalize'
import { createSelectors } from './selectors'
import { createLayers } from './layers'
import type { CreateLayersConfig } from './layers'
import type { ScalesDefinition } from './scales'
import type { TokensDefinition, SemanticTokensDefinition } from './tokens'
import type { AliasesDefinition } from './aliases'
import type { SelectorsDefinition } from './selectors'
import type { BreakpointsDefinition } from './breakpoints'

export interface SystemConfig extends CreateLayersConfig {
  prefix?: string
  scales?: ScalesDefinition
  aliases?: AliasesDefinition
  breakpoints?: BreakpointsDefinition
  selectors?: SelectorsDefinition
  tokens?: TokensDefinition
  semanticTokens?: SemanticTokensDefinition
}

export function createSystem(config: SystemConfig) {
  const {
    cssCascadeLayersDisabled = false,
    prefix = 'system',
    scales = {},
    aliases = {},
    breakpoints = {},
    tokens = {},
    semanticTokens = {},
    selectors = {},
  } = config

  const layers = createLayers({
    cssCascadeLayersDisabled,
    prefix,
  })

  const { getToken, getGlobalCssVars } = createTokens({
    tokens,
    semanticTokens,
    prefix,
  })

  const { getPropertiesByAlias, isAlias } = createAliases(aliases)

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
    isAlias,
    getCustomizedSelector,
  })

  const isSystemCSSProperty = (property: string) => {
    return isAlias(property) || isCSSProperty(property)
  }

  return {
    css,
    layers,
    getToken,
    getGlobalCssVars,
    isSystemCSSProperty,
  }
}
