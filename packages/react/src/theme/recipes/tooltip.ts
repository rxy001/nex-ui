import { defineSlotRecipe } from '@nex-ui/system'
import { toSlots, radiusVariant, colorVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const tooltipRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'tooltip',
    },
    content: {
      px: '2.5',
      py: '1',
      fs: 'md',
      boxShadow: 'md',
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
    },
  },
  variants: {
    size: {
      sm: {
        content: {
          fs: 'sm',
        },
      },
      md: {
        content: {
          fs: 'md',
        },
      },
      lg: {
        content: {
          fs: 'lg',
        },
      },
    },
    radius: toSlots(radiusVariant, 'content'),
    color: {
      ...toSlots(colorVariant, 'content'),
      default: {
        content: {
          bg: 'content',
          color: 'inherit',
        },
      },
    },
  },
})

export type TooltipRecipe = typeof tooltipRecipe
export type TooltipRecipeVariants = RecipeVariants<TooltipRecipe>
