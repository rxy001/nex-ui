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
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
      maxW: '360px',
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
          boxShadow:
            '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
        },
      },
    },
  },
})

export type TooltipRecipe = typeof tooltipRecipe
export type TooltipRecipeVariants = RecipeVariants<TooltipRecipe>
