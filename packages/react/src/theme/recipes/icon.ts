import { keyframes } from '@emotion/react'
import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '60%': { transform: 'rotate(300deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const iconRecipe = defineRecipe({
  base: {
    userSelect: 'none',
    display: 'inline-block',
    flexShrink: 0,
  },
  variants: {
    spin: {
      true: {
        animation: `${circle} 1s linear infinite`,
      },
    },
    fontSize: {
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
