import { iconRecipe } from './icon'
import { flexRecipe } from './flex'
import { dividerRecipe } from './divider'

export const recipes = {
  Icon: iconRecipe,
  Flex: flexRecipe,
  Divider: dividerRecipe,
}

export type * from './divider'
export type * from './flex'
export type * from './icon'
export type Recipes = typeof recipes
