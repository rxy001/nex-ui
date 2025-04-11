import { defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'
import {
  colorVariant,
  radiusVariant,
  toSlot,
  fullWidth,
  sizeVariant,
} from '../shared'

export const buttonRecipe = defineSlotRecipe({
  slots: {
    root: {
      outline: 'none',
      userSelect: 'none',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      transition: 'colors',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      lineHeight: 'base',
      overflow: 'hidden',
      WebkitTapHighlightColor: 'transparent',
      '& svg': {
        fs: '1.3em',
      },
      _focusVisible: {
        outline: 'focusVisibleOutline',
        outlineOffset: '0.5',
      },
    },
    startIcon: {
      display: 'inherit',
      marginInlineStart: '-1',
      marginInlineEnd: '2',
    },
    endIcon: {
      display: 'inherit',
      marginInlineStart: '2',
      marginInlineEnd: '-1',
    },
  },
  variants: {
    variant: {
      outlined: {
        root: {
          bg: 'transparent',
          border: '{borders.md} {colors.colorPalette.primary}',
          borderColor: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
          },
          color: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
          },
        },
      },
      solid: {
        root: {
          bg: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
          },
          color: 'colorPalette.contrastText',
        },
      },
      text: {
        root: {
          color: 'colorPalette.primary',
          bg: {
            _DEFAULT: 'transparent',
            _hover: 'colorPalette.subtle',
          },
        },
      },
    },
    size: toSlot(sizeVariant, 'root'),
    disabled: {
      true: {
        root: {
          opacity: 0.6,
          pointerEvents: 'none',
        },
      },
    },
    fullWidth: toSlot(fullWidth, 'root'),
    radius: toSlot(radiusVariant, 'root'),
    iconOnly: {
      true: {
        root: {
          px: '0.5',
        },
      },
    },
    color: toSlot(colorVariant, 'root'),
    disableRipple: {
      true: {},
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        root: {
          w: '8',
          '& svg': {
            fs: '1.5em',
          },
        },
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        root: {
          w: '10',
          '& svg': {
            fs: '1.7em',
          },
        },
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        root: {
          w: '12',
          '& svg': {
            fs: '1.9em',
          },
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
