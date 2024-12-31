import type { RecipeVariants, RecipeSlots } from '@nex-ui/system'
import { buttonRecipe } from './button'
import { iconRecipe } from './icon'
import { flexRecipe } from './flex'
import { inputTextRecipe } from './inputText'
import { dividerRecipe } from './divider'
import { avatarRecipe } from './avatar'

export * from './button'
export * from './icon'

export const recipes = {
  Button: buttonRecipe,
  Icon: iconRecipe,
  Flex: flexRecipe,
  InputText: inputTextRecipe,
  Divider: dividerRecipe,
  Avatar: avatarRecipe,
}

export type Recipes = typeof recipes

export type ButtonRecipe = typeof buttonRecipe
export type ButtonVariants = RecipeVariants<ButtonRecipe>
export type ButtonSlots = RecipeSlots<ButtonRecipe>

export type IconRecipe = typeof iconRecipe
export type IconVariants = RecipeVariants<IconRecipe>

export type FlexRecipe = typeof flexRecipe
export type FlexVariants = RecipeVariants<FlexRecipe>

export type InputTextRecipe = typeof inputTextRecipe
export type InputTextVariants = RecipeVariants<InputTextRecipe>
export type InputTextSlots = RecipeSlots<InputTextRecipe>

export type DividerRecipe = typeof dividerRecipe
export type DividerVariants = RecipeVariants<DividerRecipe>

export type AvatarRecipe = typeof avatarRecipe
export type AvatarVariants = RecipeVariants<AvatarRecipe>
export type AvatarSlots = RecipeSlots<AvatarRecipe>
