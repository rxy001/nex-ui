import type { RecipeVariants } from '@nex-ui/system'
import { buttonRecipe } from './button'
import { iconRecipe } from './icon'
import { flexRecipe } from './flex'
import { inputTextRecipe } from './inputText'
import { dividerRecipe } from './divider'
import { avatarRecipe } from './avatar'
import { checkboxRecipe } from './checkbox'
import { switchRecipe } from './switch'

export const recipes = {
  Button: buttonRecipe,
  Icon: iconRecipe,
  Flex: flexRecipe,
  InputText: inputTextRecipe,
  Divider: dividerRecipe,
  Avatar: avatarRecipe,
  Checkbox: checkboxRecipe,
  Switch: switchRecipe,
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

export type DividerRecipe = typeof dividerRecipe
export type DividerVariants = RecipeVariants<DividerRecipe>

export type AvatarRecipe = typeof avatarRecipe
export type AvatarVariants = RecipeVariants<AvatarRecipe>

export type CheckboxRecipe = typeof checkboxRecipe
export type CheckboxVariants = RecipeVariants<CheckboxRecipe>

export type SwitchRecipe = typeof switchRecipe
export type SwitchVariants = RecipeVariants<SwitchRecipe>
