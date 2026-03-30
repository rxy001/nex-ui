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
      lh: '1rem',
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
      ml: '1',
      '& svg': {
        fs: '1.25em',
      },
    },
    startIcon: {
      display: 'inherit',
      ml: '-1',
      mr: '1',
      '& svg': {
        fs: '1.25em',
      },
    },
    endIcon: {
      display: 'inherit',
      ml: '1',
      mr: '-1',
      '& svg': {
        fs: '1.25em',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fs: 'xs',
          h: '4',
          px: '1.5',
        },
      },
      md: {
        root: {
          fs: 'sm',
          h: '5',
          px: '2',
        },
      },
      lg: {
        root: { fs: 'md', px: '2.5', h: '6' },
      },
    },
    radius: {
      none: {
        root: {
          borderRadius: 'none',
        },
      },
      sm: {
        root: { borderRadius: 'xs' },
      },
      md: {
        root: { borderRadius: 'sm' },
      },
      lg: {
        root: { borderRadius: 'md' },
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
