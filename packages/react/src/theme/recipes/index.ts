import type { RecipeVariants } from '@nex-ui/system'
import { buttonRecipe } from './button'
import { iconRecipe } from './icon'
import { flexRecipe } from './flex'

export * from './button'
export * from './icon'

export const recipes = {
  Button: buttonRecipe,
  Icon: iconRecipe,
  Flex: flexRecipe,
}

export type Recipes = typeof recipes

export type ButtonRecipeConfig = typeof buttonRecipe.__config
export type ButtonVariants = RecipeVariants<typeof buttonRecipe>

export type IconRecipeConfig = typeof iconRecipe.__config
export type IconVariants = RecipeVariants<typeof iconRecipe>

export type FlexRecipeConfig = typeof flexRecipe.__config
export type FlexVariants = RecipeVariants<typeof flexRecipe>
