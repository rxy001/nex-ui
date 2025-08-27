import { defineSlotRecipe } from '@nex-ui/system'
import {
  colorVariant,
  radiusVariant,
  toSlots,
  fullWidth,
  sizeVariant,
} from '../shared'
import type { CSSObject, RecipeVariants } from '@nex-ui/system'

const disabledVariant: CSSObject = {
  opacity: 0.6,
  pointerEvents: 'none',
}

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
        outline: 'focusVisibleOutline',
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
          border: '{borders.md}',
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
      ghost: {
        root: {
          color: 'colorPalette.500',
          bg: {
            _DEFAULT: 'transparent',
            _hover: 'colorPalette.500/10',
          },
        },
      },
    },
    size: toSlots(sizeVariant, 'root'),
    disabled: {
      true: {
        root: disabledVariant,
      },
    },
    loading: {
      true: {
        root: disabledVariant,
      },
    },
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
