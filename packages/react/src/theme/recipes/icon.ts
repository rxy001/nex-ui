import { keyframes } from '@emotion/react'
import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const iconRecipe = defineRecipe({
  base: {
    userSelect: 'none',
  },
  variants: {
    spin: {
      true: {
        animation: `${circle} 1s linear infinite`,
      },
    },
    size: {
      sm: {
        fs: '1.25em',
      },
      md: {
        fs: '1.5em',
      },
      lg: {
        fs: '1.75em',
      },
    },
  },
})

export type IconRecipe = typeof iconRecipe
export type IconVariants = RecipeVariants<IconRecipe>
