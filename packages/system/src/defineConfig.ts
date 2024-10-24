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
defineTokens.spaceing = (v: TokensDefinition['spacing']) => v
defineTokens.radii = (v: TokensDefinition['radii']) => v

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
defineSemanticTokens.spaceing = (v: SemanticTokensDefinition['spacing']) => v
defineSemanticTokens.radii = (v: SemanticTokensDefinition['radii']) => v
