import { defineRecipe } from '@nex-ui/system'

export const textRecipe = defineRecipe({
  base: {},
  variants: {
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
})

export type TextRecipe = typeof textRecipe
