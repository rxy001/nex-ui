import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const dividerRecipe = defineRecipe({
  base: {
    m: 0,
    border: 'none',
    bg: 'gray.highlight',
  },
  variants: {
    orientation: {
      vertical: {
        mx: '6',
        w: 'px',
        h: 'full',
      },
      horizontal: {
        h: 'px',
        my: '6',
        w: 'full',
      },
    },
  },
})

export type DividerRecipe = typeof dividerRecipe
export type DividerVariants = RecipeVariants<DividerRecipe>
