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
      filled: {
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
      link: {
        root: {
          bg: 'transparent',
          color: {
            _DEFAULT: 'colorPalette.primary',
            _hover: 'colorPalette.secondary',
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
    {
      disableRipple: true,
      variant: 'filled',
      css: {
        root: {
          _active: {
            bg: 'colorPalette.tertiary',
          },
        },
      },
    },
    {
      disableRipple: true,
      variant: 'outlined',
      css: {
        root: {
          _active: {
            borderColor: 'colorPalette.tertiary',
            color: 'colorPalette.tertiary',
          },
        },
      },
    },
    {
      disableRipple: true,
      variant: 'text',
      css: {
        root: {
          _active: {
            bg: 'colorPalette.muted',
          },
        },
      },
    },
    {
      disableRipple: true,
      variant: 'link',
      css: {
        root: {
          _active: {
            color: 'colorPalette.tertiary',
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
