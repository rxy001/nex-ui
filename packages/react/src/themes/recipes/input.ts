import { defineSlotRecipe } from '@nex-ui/system'
import {
  colorVariant,
  fullWidth,
  radiusVariant,
  toSlots,
  disabledVariant,
} from './shared'
import type { RecipeVariants } from '@nex-ui/system'

const WITHIN_SELECTOR = '&:has(~ *:is(:focus-within, [data-focus-within=true]))'

export const inputRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1',
      cursor: 'text',
      pos: 'relative',
      px: '3',
    },
    input: {
      fs: 'inherit',
      cursor: 'inherit',
      flex: 1,
      w: 'full',
      '::placeholder': {
        color: 'inherit',
      },
    },
    clearButton: {
      fs: 'md',
      color: 'gray.400',
      _hover: {
        color: 'gray.500',
      },
    },
    label: {
      pos: 'absolute',
      pointerEvents: 'none',
      transformOrigin: 'top left',
    },
    prefix: {
      pointerEvents: 'none',
    },
    suffix: {
      pointerEvents: 'none',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fs: 'sm',
          h: '8',
        },
      },
      md: {
        root: {
          fs: 'md',
          h: '10',
        },
      },
      lg: {
        root: {
          fs: 'md',
          h: '12',
        },
      },
    },
    fullWidth: toSlots(fullWidth, 'root'),
    radius: toSlots(radiusVariant, 'root'),
    color: toSlots(colorVariant, 'root', 'label', 'clearButton'),
    variant: {
      outlined: {
        root: {
          border: 'md',
          borderColor: 'gray.highlight',
          _hover: {
            borderColor: 'gray.secondary',
          },
          _focusWithin: {
            borderColor: 'colorPalette.primary',
          },
        },
        label: {
          [WITHIN_SELECTOR]: {
            color: 'colorPalette.primary',
          },
        },
      },
      faded: {
        root: {
          bg: 'colorPalette.100',
          _hover: {
            bg: 'colorPalette.50',
          },
          _focusWithin: {
            bg: 'colorPalette.50',
          },
          _dark: {
            bg: 'colorPalette.800/50',
            _hover: {
              bg: 'colorPalette.900/50',
            },
            _focusWithin: {
              bg: 'colorPalette.900/50',
            },
          },

          '&:has(> [data-focus-visible=true]:not(:disabled, [data-disabled=true]))':
            {
              outline: '{borders.md} {colors.colorPalette.primary}',
            },
          color: {
            _DEFAULT: 'colorPalette.500',
            _dark: 'colorPalette.400',
          },
        },
        clearButton: {
          color: 'colorPalette.500',
          _hover: {
            color: 'colorPalette.400',
          },
          _dark: {
            color: 'colorPalette.400',
            _hover: {
              color: 'colorPalette.300',
            },
          },
        },
      },
      underlined: {
        root: {
          px: '1.5',
          '::before': {
            content: '""',
            pos: 'absolute',
            insetBlockEnd: 0,
            insetInlineStart: 0,
            w: 'full',
            h: '2px',
            bg: 'gray.highlight',
          },
          '::after': {
            content: '""',
            pos: 'absolute',
            insetBlockEnd: 0,
            insetInlineStart: '50%',
            transform: 'translateX(-50%)',
            w: 0,
            h: '2px',
            bg: 'colorPalette.primary',
          },
          _focusWithin: {
            '::after': {
              w: 'full',
            },
          },
          _hover: {
            '::before': {
              bg: 'gray.secondary',
            },
          },
        },
        label: {
          [WITHIN_SELECTOR]: {
            color: 'colorPalette.primary',
          },
        },
      },
    },
    disabled: toSlots(disabledVariant, 'root'),
    invalid: {
      true: {},
    },
    labelPlacement: {
      'float-outside': {
        label: {
          [WITHIN_SELECTOR]: {
            insetInlineStart: '0',
            insetBlockStart: '-1em',
          },
        },
      },
      outside: {
        label: {
          insetInlineStart: '0',
          insetBlockStart: '-1em',
          transform: 'translateY(-50%)',
          pointerEvents: 'auto',
        },
      },
      'float-inside': {
        label: {
          [WITHIN_SELECTOR]: {
            transform: 'translateY(-90%) scale(0.8)',
          },
        },
      },
      inside: {
        label: {
          insetBlockStart: '50%',
          transform: 'translateY(-90%) scale(0.8)',
        },
      },
    },
    disableAnimation: {
      false: {
        root: {
          transition: 'colors',
        },
        label: {
          transitionProperty: 'inset, color, transform',
          transitionDuration: '0.2s',
        },
      },
    },
  },
  compoundVariants: [
    {
      labelPlacement: ['float-outside', 'float-inside'],
      css: {
        label: {
          transform: 'translateY(-50%) scale(1)',
          insetBlockStart: '50%',
          insetInlineStart: '3',
        },
      },
    },
    {
      labelPlacement: ['float-outside', 'outside'],
      css: {
        root: {
          mt: '1.5em',
        },
      },
    },
    {
      labelPlacement: ['float-outside', 'float-inside'],
      variant: ['underlined'],
      css: {
        label: {
          insetInlineStart: '1.5',
        },
      },
    },
    {
      labelPlacement: 'float-outside',
      variant: 'underlined',
      css: {
        label: {
          [WITHIN_SELECTOR]: {
            insetBlockStart: '-0.7em',
          },
        },
      },
    },
    {
      labelPlacement: 'outside',
      variant: 'underlined',
      css: {
        label: {
          insetBlockStart: '-0.7em',
        },
      },
    },
    {
      size: 'sm',
      labelPlacement: ['float-inside', 'inside'],
      css: {
        root: {
          h: '10',
        },
        input: {
          mt: '0.9em',
        },
        prefix: {
          mt: '0.9em',
        },
        suffix: {
          mt: '0.9em',
        },
        clearButton: {
          mt: '0.9em',
        },
      },
    },
    {
      size: 'md',
      labelPlacement: ['float-inside', 'inside'],
      css: {
        root: {
          h: '12',
        },
        input: {
          mt: '1em',
        },
        prefix: {
          mt: '1em',
        },
        suffix: {
          mt: '1em',
        },
        clearButton: {
          mt: '1em',
        },
      },
    },
    {
      size: 'lg',
      labelPlacement: ['float-inside', 'inside'],
      css: {
        root: {
          h: '14',
        },
        input: {
          mt: '1.2em',
        },
        prefix: {
          mt: '1.2em',
        },
        suffix: {
          mt: '1.2em',
        },
        clearButton: {
          mt: '1.2em',
        },
      },
    },
    {
      radius: 'full',
      variant: ['faded', 'outlined'],
      labelPlacement: ['float-inside', 'inside'],
      css: {
        root: {
          px: '4',
        },
        label: {
          insetInlineStart: '4',
        },
      },
    },
    {
      radius: 'full',
      labelPlacement: ['float-inside', 'inside'],
      variant: ['faded', 'outlined'],
      size: 'lg',
      css: {
        root: {
          px: '5',
        },
        label: {
          insetInlineStart: '5',
        },
      },
    },
    {
      invalid: true,
      variant: ['outlined', 'underlined'],
      css: {
        label: {
          color: 'red.primary',
          [WITHIN_SELECTOR]: {
            color: 'red.primary',
          },
        },
      },
    },
    {
      invalid: true,
      variant: 'faded',
      css: {
        root: {
          bg: 'red.subtle',
          _hover: {
            bg: 'red.muted',
          },
          _focusWithin: {
            bg: 'red.muted',
          },
          colorPalette: 'red',
        },
      },
    },
    {
      invalid: true,
      variant: 'outlined',
      css: {
        root: {
          borderColor: 'red.primary',
          _hover: {
            borderColor: 'red.primary',
          },
          _focusWithin: {
            borderColor: 'red.primary',
          },
        },
        input: {
          color: 'red.primary',
        },
      },
    },
    {
      invalid: true,
      variant: 'underlined',
      css: {
        root: {
          '::after': {
            bg: 'red.primary',
          },
          '::before': {
            bg: 'red.primary',
          },
          _focusWithin: {
            '::after': {
              bg: 'red.primary',
            },
          },
          _hover: {
            '::before': {
              bg: 'red.primary',
            },
          },
        },
        input: {
          color: 'red.primary',
        },
      },
    },
    {
      disableAnimation: false,
      variant: 'underlined',
      css: {
        root: {
          '::before': {
            transition: 'colors',
          },
          '::after': {
            transition: 'width 0.2s ease',
          },
        },
      },
    },
  ],
})

export type InputRecipe = typeof inputRecipe
export type InputVariants = RecipeVariants<InputRecipe>
