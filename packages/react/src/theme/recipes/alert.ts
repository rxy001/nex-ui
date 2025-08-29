import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots, radiusVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const alertRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      alignItems: 'center',
      px: '4',
      py: '3',
      gap: '3',
      overflow: 'hidden',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 26,
    },
    content: {
      flex: 1,
      minHeight: '8',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1',
      color: 'inherit',
    },
    title: {
      fontWeight: 'medium',
      fs: 'md',
      color: 'inherit',
    },
    description: {
      fs: 'md',
      opacity: 0.9,
      color: 'inherit',
    },
    closeButton: {},
  },
  variants: {
    variant: {
      solid: {
        root: {
          bg: 'colorPalette.primary',
          color: 'colorPalette.contrastText',
        },
        closeButton: {
          color: 'colorPalette.contrastText',
        },
      },
      outlined: {
        root: {
          bg: 'transparent',
          border: 'sm',
          borderColor: 'colorPalette.primary',
          color: {
            _DEFAULT: 'colorPalette.600',
            _dark: 'colorPalette.400',
          },
        },
      },
      faded: {
        root: {
          bg: 'colorPalette.subtle',
          color: {
            _DEFAULT: 'colorPalette.600',
            _dark: 'colorPalette.400',
          },
        },
      },
      subtle: {
        root: {
          bg: 'colorPalette.subtle',
          color: {
            _DEFAULT: 'colorPalette.600',
            _dark: 'colorPalette.400',
          },
          border: 'sm',
          borderColor: 'colorPalette.highlight',
        },
      },
    },
    color: toSlots(colorVariant, 'root', 'closeButton'),
    radius: toSlots(radiusVariant, 'root'),
  },
})

export type AlertRecipe = typeof alertRecipe

export type AlertVariants = RecipeVariants<AlertRecipe>
