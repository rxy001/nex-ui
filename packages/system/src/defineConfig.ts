import type { SemanticTokensDefinition, TokensDefinition } from './tokens'
import type { SystemConfig } from './system'

export const defineConfig = (config: SystemConfig) => config
defineConfig.selectors = (v: SystemConfig['selectors']) => v
defineConfig.aliases = (v: SystemConfig['aliases']) => v
defineConfig.scales = (v: SystemConfig['scales']) => v
defineConfig.breakpoints = (v: SystemConfig['breakpoints']) => v

export const defineTokens = (v: TokensDefinition) => v
defineTokens.colors = (v: TokensDefinition['colors']) => v
defineTokens.borders = (v: TokensDefinition['borders']) => v
defineTokens.lineHeights = (v: TokensDefinition['lineHeights']) => v
defineTokens.fontFamilies = (v: TokensDefinition['fontFamilies']) => v
defineTokens.fontSizes = (v: TokensDefinition['fontSizes']) => v
defineTokens.fontWeights = (v: TokensDefinition['fontWeights']) => v
defineTokens.sizes = (v: TokensDefinition['sizes']) => v
defineTokens.spaces = (v: TokensDefinition['spaces']) => v
defineTokens.radii = (v: TokensDefinition['radii']) => v
defineTokens.shadows = (v: TokensDefinition['shadows']) => v
defineTokens.transitions = (v: TokensDefinition['transitions']) => v
defineTokens.borderWidths = (v: TokensDefinition['borderWidths']) => v
defineTokens.zIndexes = (v: TokensDefinition['zIndexes']) => v

export const defineSemanticTokens = (v: SemanticTokensDefinition) => v
defineSemanticTokens.colors = (v: SemanticTokensDefinition['colors']) => v
defineSemanticTokens.borders = (v: SemanticTokensDefinition['borders']) => v
defineSemanticTokens.lineHeights = (
  v: SemanticTokensDefinition['lineHeights'],
) => v
defineSemanticTokens.fontFamilies = (
  v: SemanticTokensDefinition['fontFamilies'],
) => v
defineSemanticTokens.fontSizes = (v: SemanticTokensDefinition['fontSizes']) => v
defineSemanticTokens.fontWeights = (
  v: SemanticTokensDefinition['fontWeights'],
) => v
defineSemanticTokens.sizes = (v: SemanticTokensDefinition['sizes']) => v
defineSemanticTokens.spaces = (v: SemanticTokensDefinition['spaces']) => v
defineSemanticTokens.radii = (v: SemanticTokensDefinition['radii']) => v
defineSemanticTokens.shadows = (v: SemanticTokensDefinition['shadows']) => v
defineSemanticTokens.transitions = (
  v: SemanticTokensDefinition['transitions'],
) => v
defineSemanticTokens.borderWidths = (
  v: SemanticTokensDefinition['borderWidths'],
) => v
defineSemanticTokens.zIndexes = (v: SemanticTokensDefinition['zIndexes']) => v
