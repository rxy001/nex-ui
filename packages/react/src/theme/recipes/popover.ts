import { defineRecipe } from '@nex-ui/system'
import { radiusVariant, colorVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const popoverRecipe = defineRecipe({
  base: {
    zIndex: 'popover',
    _focusVisibleRing: {
      outline: 'none',
    },
  },
})

export const popoverContentRecipe = defineRecipe({
  base: {
    px: '2.5',
    py: '1',
    fs: 'md',
    bg: 'colorPalette.primary',
    color: 'colorPalette.contrastText',
    maxW: '360px',
  },
  variants: {
    radius: radiusVariant,
    color: {
      ...colorVariant,
      default: {
        bg: 'content',
        color: 'inherit',
        boxShadow:
          '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
      },
    },
  },
})

export type PopoverRecipe = typeof popoverRecipe

export type PopoverContentRecipe = typeof popoverContentRecipe
export type PopoverContentVariants = RecipeVariants<PopoverContentRecipe>
