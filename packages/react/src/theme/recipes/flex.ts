import { defineRecipe } from '@nex-ui/system'

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
