import { defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'
import {
  colorVariant,
  fullWidth,
  radiusVariant,
  toSlot,
  sizeVariant,
} from '../shared'

export const inputTextRecipe = defineSlotRecipe({
  slots: {
    root: {
      border: 'md',
      boxSizing: 'border-box',
      transition: 'colors',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5',
      cursor: 'text',
    },
    input: {
      outline: 'none',
      border: 'none',
      fs: 'inherit',
      bg: 'transparent',
      color: 'inherit',
      height: '100%',
      flex: 1,
      cursor: 'inherit',
    },
    clearBtn: {
      padding: 0,
      width: 'auto',
      height: 'auto',
      fontSize: 'inherit',
    },
  },
  variants: {
    size: toSlot(sizeVariant, 'root'),
    radius: toSlot(radiusVariant, 'root'),
    color: toSlot(colorVariant, 'root'),
    variant: {
      outlined: {
        root: {
          borderColor: 'gray.highlight',
        },
      },
      filled: {
        root: {
          bg: 'gray.muted',
          borderColor: 'gray.muted',
        },
      },
      borderless: {
        root: {
          bg: 'transparent',
          borderColor: 'transparent',
        },
      },
    },
    disabled: {
      true: {
        root: {
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },
    },
    fullWidth: toSlot(fullWidth, 'root'),
    error: {
      true: {
        root: {
          color: 'red.primary',
        },
      },
    },
  },
  compoundVariants: [
    {
      disabled: false,
      variant: 'outlined',
      error: false,
      css: {
        root: {
          '&:hover': {
            borderColor: 'colorPalette.secondary',
          },
          '&:focus-within': {
            borderColor: 'colorPalette.accent',
          },
        },
      },
    },
    {
      disabled: false,
      error: false,
      variant: 'filled',
      css: {
        root: {
          '&:hover': {
            bg: 'gray.tertiary',
            borderColor: 'gray.tertiary',
          },
          '&:focus-within': {
            borderColor: 'colorPalette.accent',
            bg: 'transparent',
          },
        },
      },
    },
    {
      error: true,
      variant: 'outlined',
      css: {
        root: {
          borderColor: 'red.primary',
        },
      },
    },
    {
      error: true,
      variant: 'filled',
      css: {
        root: {
          bg: 'red.muted',
          borderColor: 'red.muted',
          '&:focus-within': {
            borderColor: 'red.primary',
            bg: 'transparent',
          },
        },
      },
    },
  ],
  defaultVariants: {
    disabled: false,
    fullWidth: false,
  },
})

export type InputTextRecipe = typeof inputTextRecipe
export type InputTextVariants = RecipeVariants<InputTextRecipe>
