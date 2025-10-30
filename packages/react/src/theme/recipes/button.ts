import { defineSlotRecipe } from '@nex-ui/system'
import {
  colorVariant,
  radiusVariant,
  toSlots,
  fullWidth,
  sizeVariant,
  disabledVariant,
} from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const buttonRecipe = defineSlotRecipe({
  slots: {
    root: {
      position: 'relative',
      transition: 'colors',
      lineHeight: 'base',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      _focusVisibleRing: {
        outline: '{borders.md} {colors.colorPalette.primary}',
        outlineOffset: '0.5',
      },
    },
    startIcon: {
      display: 'inherit',
      ml: '-1',
      mr: '2',
      fs: '1.25em',
    },
    endIcon: {
      display: 'inherit',
      ml: '2',
      mr: '-1',
      fs: '1.25em',
    },
  },
  variants: {
    variant: {
      outlined: {
        root: {
          bg: 'transparent',
          border: 'md',
          borderColor: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _expanded: 'colorPalette.secondary',
          },
          color: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _expanded: 'colorPalette.secondary',
          },
        },
      },
      solid: {
        root: {
          bg: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _expanded: 'colorPalette.secondary',
          },
          color: 'colorPalette.contrastText',
        },
      },
      ghost: {
        root: {
          color: 'colorPalette.500',
          bg: {
            _DEFAULT: 'transparent',
            _hover: 'colorPalette.500/10',
            _expanded: 'colorPalette.500/10',
          },
        },
      },
      faded: {
        root: {
          bg: {
            _DEFAULT: 'colorPalette.100',
            _hover: 'colorPalette.50',
            _expanded: 'colorPalette.50',
            _dark: {
              _DEFAULT: 'colorPalette.800/50',
              _hover: 'colorPalette.900/50',
              _expanded: 'colorPalette.900/50',
            },
          },
          color: {
            _DEFAULT: 'colorPalette.600',
            _dark: 'colorPalette.400',
          },
        },
      },
    },
    size: toSlots(sizeVariant, 'root'),
    disabled: toSlots(disabledVariant, 'root'),
    loading: toSlots(disabledVariant, 'root'),
    fullWidth: toSlots(fullWidth, 'root'),
    radius: toSlots(radiusVariant, 'root'),
    iconOnly: {
      true: {
        root: {
          px: '0.5',
        },
      },
    },
    color: toSlots(colorVariant, 'root'),
    disableRipple: {
      true: {
        root: {
          transition: 'scale',
          _active: {
            scale: '0.95',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        root: {
          w: '8',
          fs: '1.5em',
        },
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        root: {
          w: '10',
          fs: '1.7em',
        },
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        root: {
          w: '12',
          fs: '1.9em',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
})

export type ButtonRecipe = typeof buttonRecipe
export type ButtonVariants = RecipeVariants<ButtonRecipe>
