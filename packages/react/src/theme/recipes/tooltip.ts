import { defineSlotRecipe } from '@nex-ui/system'
import { toSlots, radiusVariant, colorVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const tooltipRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'tooltip',
    },
    paper: {
      px: '2.5',
      py: '1',
      fs: 'md',
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
      overflow: 'auto',
      boxSizing: 'border-box',
      maxW: 'var(--tooltip-max-width, 360px)',
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
      width: 'max-content',
    },
  },
  variants: {
    size: {
      sm: {
        paper: {
          fs: 'sm',
        },
      },
      md: {
        paper: {
          fs: 'md',
        },
      },
      lg: {
        paper: {
          fs: 'lg',
        },
      },
    },
    radius: toSlots(radiusVariant, 'paper'),
    color: {
      ...toSlots(colorVariant, 'paper'),
      default: {
        paper: {
          bg: 'content',
          color: 'inherit',
        },
      },
    },
  },
})

export type TooltipRecipe = typeof tooltipRecipe
export type TooltipRecipeVariants = RecipeVariants<TooltipRecipe>
