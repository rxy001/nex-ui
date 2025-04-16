import { defineSlotRecipe } from '@nex-ui/system'
import { keyframes } from '@emotion/react'
import type { RecipeVariants } from '@nex-ui/system'
import {
  colorVariant,
  radiusVariant,
  toSlot,
  fullWidth,
  sizeVariant,
} from '../shared'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '45%': { transform: 'rotate(240deg)' },
  '90%': { transform: 'rotate(320deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

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
      _focusVisible: {
        outline: 'focusVisibleOutline',
        outlineOffset: '0.5',
      },
    },
    startIcon: {
      display: 'inherit',
      marginInlineStart: '-1',
      marginInlineEnd: '2',
      fs: '1.25em',
    },
    endIcon: {
      display: 'inherit',
      marginInlineStart: '2',
      marginInlineEnd: '-1',
      fs: '1.25em',
    },
    loadingIcon: {
      animation: `${circle} 1s linear infinite`,
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
