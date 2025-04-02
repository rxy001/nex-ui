import './types/declare'

export * from './components'
export * from './theme'

export * from '@nex-ui/styled'

export { useColorScheme, defineRecipe, defineSlotRecipe } from '@nex-ui/system'

export type {
  RecipeRuntimeFn,
  RecipeConfig,
  SlotRecipeConfig,
  SlotRecipeRuntimeFn,
  RecipeVariants,
  RecipeSlots,
  ColorSchemeProviderProps,
  CSSObject,
  Mode,
} from '@nex-ui/system'

export type { Theme } from './types/theme'
export type { TokensOverrides } from './types/generated/tokens'
export type { SemanticTokensOverrides } from './types/generated/semanticTokens'
export type { AliasesOverrides } from './types/generated/aliases'
export type { BreakpointsOverrides } from './types/generated/breakpoints'
export type { SelectorsOverrides } from './types/generated/selectors'
export type { ScalesOverrides } from './types/generated/scales'
