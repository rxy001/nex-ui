import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const popoverContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'popover',
    },
    paper: {
      fs: 'md',
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
          bg: 'content',
          color: 'inherit',
        },
      },
    },
    radius: {
      sm: {
        paper: {
          borderRadius: 'md',
        },
      },
      md: {
        paper: {
          borderRadius: 'lg',
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
        },
      },
      md: {
        paper: {
          px: '3',
          py: '1.5',
        },
      },
      lg: {
        paper: {
          px: '4',
          py: '2',
        },
      },
    },
  },
})

export type PopoverContentRecipe = typeof popoverContentRecipe
export type PopoverContentVariants = RecipeVariants<PopoverContentRecipe>
