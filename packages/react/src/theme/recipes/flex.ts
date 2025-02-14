import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const flexRecipe = defineRecipe({
  base: {
    display: 'flex',
  },
  variants: {
    inline: {
      true: {
        display: 'inline-flex',
      },
    },
  },
})

export type FlexRecipe = typeof flexRecipe
export type FlexVariants = RecipeVariants<FlexRecipe>
