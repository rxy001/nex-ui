import { defineSlotRecipe } from '@nex-ui/system'
import { toSlots, colorVariant } from './shared'
import type { RecipeVariants } from '@nex-ui/system'

export const tooltipRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'tooltip',
    },
    paper: {
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
      overflow: 'auto',
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
    },
  },
  variants: {
    size: {
      sm: {
        paper: {
          px: '2',
          py: '0.5',
          fs: 'xs',
        },
      },
      md: {
        paper: {
          px: '2.5',
          py: '1',
          fs: 'sm',
        },
      },
      lg: {
        paper: {
          px: '3',
          py: '1.5',
          fs: 'md',
        },
      },
    },
    color: {
      ...toSlots(colorVariant, 'paper'),
      default: {
        paper: {
          bg: 'panelBg',
          color: 'inherit',
        },
      },
    },
    radius: {
      sm: {
        paper: {
          borderRadius: 'lg',
        },
      },
      md: {
        paper: {
          borderRadius: 'xl',
        },
      },
      lg: {
        paper: {
          borderRadius: '2xl',
        },
      },
      none: {
        paper: {
          borderRadius: 'none',
        },
      },
    },
  },
})

export type TooltipRecipe = typeof tooltipRecipe
export type TooltipRecipeVariants = RecipeVariants<TooltipRecipe>
