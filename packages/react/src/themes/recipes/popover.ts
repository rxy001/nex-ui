import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from './shared'
import type { RecipeVariants } from '@nex-ui/system'

export const popoverContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'popover',
    },
    paper: {
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
      boxSizing: 'border-box',
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
    },
  },
  variants: {
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
    size: {
      sm: {
        paper: {
          px: '2',
          py: '1',
          fs: 'xs',
        },
      },
      md: {
        paper: {
          px: '3',
          py: '1.5',
          fs: 'sm',
        },
      },
      lg: {
        paper: {
          px: '4',
          py: '2',
          fs: 'md',
        },
      },
    },
  },
})

export type PopoverContentRecipe = typeof popoverContentRecipe
export type PopoverContentVariants = RecipeVariants<PopoverContentRecipe>
