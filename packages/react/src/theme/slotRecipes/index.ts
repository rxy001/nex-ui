import { buttonRecipe } from './button'
import { inputTextRecipe } from './inputText'
import { avatarRecipe } from './avatar'
import { checkboxRecipe } from './checkbox'
import { switchRecipe } from './switch'

export const slotRecipes = {
  Button: buttonRecipe,
  InputText: inputTextRecipe,
  Avatar: avatarRecipe,
  Checkbox: checkboxRecipe,
  Switch: switchRecipe,
}

export type * from './button'
export type * from './inputText'
export type * from './avatar'
export type * from './checkbox'
export type * from './switch'
export type SlotRecipes = typeof slotRecipes
