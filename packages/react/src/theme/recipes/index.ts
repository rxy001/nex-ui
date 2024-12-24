import type { RecipeVariants } from '@nex-ui/system'
import { buttonRecipe } from './button'
import { iconRecipe } from './icon'
import { flexRecipe } from './flex'
import { inputTextRecipe } from './inputText'

export * from './button'
export * from './icon'

export const recipes = {
  Button: buttonRecipe,
  Icon: iconRecipe,
  Flex: flexRecipe,
  InputText: inputTextRecipe,
}

export type Recipes = typeof recipes

export type ButtonRecipe = typeof buttonRecipe
export type ButtonVariants = RecipeVariants<ButtonRecipe>

export type IconRecipe = typeof iconRecipe
export type IconVariants = RecipeVariants<IconRecipe>

export type FlexRecipe = typeof flexRecipe
export type FlexVariants = RecipeVariants<FlexRecipe>

export type InputTextRecipe = typeof inputTextRecipe
export type InputTextVariants = RecipeVariants<InputTextRecipe>
