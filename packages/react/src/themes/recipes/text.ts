import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

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
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
    strikethrough: {
      true: {
        textDecoration: 'line-through',
      },
    },
    size: {
      xs: {
        fs: 'xs',
        lh: 'calc(1 / 0.75)',
      },
      sm: {
        fs: 'sm',
        lh: 'calc(1.25 / 0.875)',
      },
      md: {
        fs: 'md',
        lh: 'calc(1.5 / 1)',
      },
      lg: {
        fs: 'lg',
        lh: 'calc(1.75 / 1.125)',
      },
      xl: {
        fs: 'xl',
        lh: 'calc(1.75 / 1.25)',
      },
      '2xl': {
        fs: '2xl',
        lh: 'calc(2 / 1.5)',
      },
      '3xl': {
        fs: '3xl',
        lh: 'calc(2.25 / 1.875)',
      },
      '4xl': {
        fs: '4xl',
        lh: 'calc(2.5 / 2.25)',
      },
    },
  },
  compoundVariants: [
    {
      strikethrough: true,
      underline: true,
      css: {
        textDecoration: 'underline line-through',
      },
    },
  ],
})

export type TextRecipe = typeof textRecipe
export type TextVariants = RecipeVariants<TextRecipe>
