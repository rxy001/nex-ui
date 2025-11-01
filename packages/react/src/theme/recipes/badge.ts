import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const badgeRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      gap: '1',
      lh: '1rem',
      '& svg': {
        fs: '1.25em',
      },
    },
    closeButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'colorPalette.tertiary',
      opacity: 0.7,
      borderRadius: 'full',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.7,
      },
      _focusVisibleRing: {
        outline: '{borders.md} {colors.colorPalette.primary}',
      },
      mr: '-1',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fs: 'sm',
          h: '5',
          px: '2',
        },
      },
      md: {
        root: { fs: 'md', px: '2.5', h: '6' },
      },
      lg: {
        root: { fs: 'md', px: '3', h: '7' },
      },
      xl: {
        root: { fs: 'lg', px: '3.5', h: '8', gap: '1.5' },
      },
    },
    radius: {
      none: {
        root: {
          borderRadius: 'none',
        },
      },
      sm: {
        root: { borderRadius: 'sm' },
      },
      md: {
        root: { borderRadius: 'md' },
      },
      lg: {
        root: { borderRadius: 'lg' },
      },
      xl: {
        root: { borderRadius: 'lg' },
      },
      full: {
        root: {
          borderRadius: 'full',
        },
      },
    },
    color: toSlots(colorVariant, 'root', 'closeButton'),
    variant: {
      solid: {
        root: {
          bg: 'colorPalette.primary',
          color: 'colorPalette.contrastText',
        },
        closeButton: {
          color: 'colorPalette.contrastText',
          _focusVisibleRing: {
            outline: '{borders.md} {colors.colorPalette.contrastText}',
          },
        },
      },
      outlined: {
        root: {
          bg: 'transparent',
          border: 'sm',
          borderColor: 'colorPalette.primary',
          color: 'colorPalette.tertiary',
        },
      },
      faded: {
        root: {
          bg: 'colorPalette.subtle',
          color: 'colorPalette.tertiary',
        },
      },
      subtle: {
        root: {
          bg: 'colorPalette.subtle',
          color: 'colorPalette.tertiary',
          border: 'sm',
          borderColor: 'colorPalette.highlight',
        },
      },
    },
    disabled: {
      true: {
        root: {
          opacity: 0.8,
          pointerEvents: 'none',
        },
      },
    },
  },
})

export type BadgeRecipe = typeof badgeRecipe
export type BadgeVariants = RecipeVariants<BadgeRecipe>
