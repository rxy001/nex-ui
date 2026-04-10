import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const headingRecipe = defineRecipe({
  base: {
    fontWeight: 600,
  },
  variants: {
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    size: {
      xs: {
        fs: 'sm',
        lh: 'calc(1.25 / 0.875)',
      },
      sm: {
        fs: 'md',
        lh: 'calc(1.5 / 1)',
      },
      md: {
        fs: 'lg',
        lh: 'calc(1.75 / 1.125)',
      },
      lg: {
        fs: 'xl',
        lh: 'calc(1.75 / 1.25)',
      },
      xl: {
        fs: '2xl',
        lh: 'calc(2 / 1.5)',
      },
      '2xl': {
        fs: '3xl',
        lh: 'calc(2.375 / 1.875)',
      },
      '3xl': {
        fs: '4xl',
        lh: 'calc(2.75 / 2.25)',
      },
      '4xl': {
        fs: '5xl',
        lh: 'calc(3.75 / 3)',
      },
    },
  },
})

export type HeadingRecipe = typeof headingRecipe
export type HeadingVariants = RecipeVariants<HeadingRecipe>
