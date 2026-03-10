import { defineSlotRecipe } from '@nex-ui/system'
import { radiusVariant, colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const popoverContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'popover',
    },
    paper: {
      px: '3',
      py: '1.5',
      fs: 'md',
      bg: 'colorPalette.primary',
      color: 'colorPalette.contrastText',
      maxWidth: 'var(--popover-max-width, 360px)',
      width: 'var(--popover-width, auto)',
      boxSizing: 'border-box',
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
    },
  },
  variants: {
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

export type PopoverContentRecipe = typeof popoverContentRecipe
export type PopoverContentVariants = RecipeVariants<PopoverContentRecipe>
