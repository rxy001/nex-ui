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
      border: 'md',
      cursor: 'pointer',
      position: 'relative',
      transition: 'colors',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      lineHeight: 'base',
      borderColor: 'transparent',
      bg: 'transparent',
      '& svg': {
        fs: '1.3em',
      },
    },
    startIcon: {
      display: 'inherit',
      mr: '2',
      ml: '-1',
    },
    endIcon: {
      display: 'inherit',
      ml: '2',
      mr: '-1',
    },
  },
  variants: {
    variant: {
      outlined: {
        root: {
          borderColor: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _active: 'colorPalette.accent',
          },
          color: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _active: 'colorPalette.accent',
          },
        },
      },
      filled: {
        root: {
          bg: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _active: 'colorPalette.accent',
          },
          color: 'colorPalette.contrastText',
        },
      },
      text: {
        root: {
          color: 'colorPalette.primary',
          bg: {
            _hover: 'colorPalette.muted',
            _active: 'colorPalette.tertiary',
          },
        },
      },
      link: {
        root: {
          color: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
            _active: 'colorPalette.accent',
          },
        },
      },
    },
    size: toSlot(sizeVariant, 'root'),
    disabled: {
      true: {
        root: {
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.6,
            '& a': {
              pointerEvents: 'none',
            },
          },
        },
      },
    },
    loading: {
      true: {
        root: {
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.6,
            '& a': {
              pointerEvents: 'none',
            },
          },
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
    variant: 'filled',
    size: 'md',
    radius: 'md',
  },
})

export type ButtonRecipe = typeof buttonRecipe
export type ButtonVariants = RecipeVariants<ButtonRecipe>
