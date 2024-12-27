import { defineRecipe } from '@nex-ui/system'

export const dividerRecipe = defineRecipe({
  base: {
    m: 0,
    border: 'none',
    bg: 'gray.200',
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
