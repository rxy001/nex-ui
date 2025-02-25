import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const dividerRecipe = defineRecipe({
  base: {
    m: 0,
    border: 'none',
    bg: 'gray.tertiary',
  },
  variants: {
    orientation: {
      vertical: {
        mx: '6',
        width: 'px',
        height: '100%',
      },
      horizontal: {
        height: 'px',
        my: '6',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type DividerRecipe = typeof dividerRecipe
export type DividerVariants = RecipeVariants<DividerRecipe>
