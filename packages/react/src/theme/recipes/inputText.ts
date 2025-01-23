import { defineSlotRecipe } from '@nex-ui/system'
import {
  colorVariant,
  fullWidth,
  radiusVariant,
  toSlot,
  sizeVariant,
} from './shared'

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
          borderColor: 'gray.300',
        },
      },
      filled: {
        root: {
          bg: 'gray.100',
          borderColor: 'gray.100',
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
          color: {
            _DEFAULT: 'red.500',
            _dark: 'red.600',
          },
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
            borderColor: 'colorPalette.outlined.hover',
          },
          '&:focus-within': {
            borderColor: 'colorPalette.outlined.active',
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
            bg: 'gray.200',
            borderColor: 'gray.200',
          },
          '&:focus-within': {
            borderColor: 'colorPalette.filled.active',
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
          borderColor: {
            _DEFAULT: 'red.500',
            _dark: 'red.600',
          },
        },
      },
    },
    {
      error: true,
      variant: 'filled',
      css: {
        root: {
          bg: 'red.100',
          borderColor: 'red.100',
          '&:focus-within': {
            borderColor: {
              _DEFAULT: 'red.500',
              _dark: 'red.600',
            },
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
