import './types/declare'

export * from './components'
export * from './theme'

export type { Theme } from './types/theme'
export type { ComponentThemes } from './types/componentThemes'

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
  StyleObject,
  Mode,
} from '@nex-ui/system'
