import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, fullWidth, radiusVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

const WITHIN_SELECTOR = '&:has(+ *:is(:focus-within, [data-focus-within=true]))'

export const inputRecipe = defineSlotRecipe({
  slots: {
    root: {
      boxSizing: 'border-box',
      transition: 'colors',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1',
      cursor: 'text',
      position: 'relative',
      px: '3',
    },
    input: {
      outline: 'none',
      border: 'none',
      fs: 'inherit',
      bg: 'transparent',
      color: 'inherit',
      flex: 1,
      cursor: 'inherit',
      w: 'full',
      p: 0,
      '::placeholder': {
        color: 'inherit',
      },
      '::WebkitSearchCancelButton': {
        WebkitAppearance: 'none',
        appearance: 'none',
      },
    },
    clearBtn: {
      padding: 0,
      w: 'auto',
      h: 'auto',
      fs: 'inherit',
    },
    label: {
      position: 'absolute',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      transition: 'colors',
    },
    prefix: {
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    suffix: {
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fs: 'md',
          h: '8',
        },
        input: {
          py: '2',
        },
      },
      md: {
        root: {
          fs: 'lg',
          h: '10',
        },
        input: {
          py: '2.5',
        },
      },
      lg: {
        root: {
          fs: 'lg',
          h: '12',
        },
        input: {
          py: '3',
        },
      },
    },
    fullWidth: toSlots(fullWidth, 'root'),
    radius: toSlots(radiusVariant, 'root'),
    color: toSlots(colorVariant, 'root', 'label', 'input'),
    variant: {
      outlined: {
        root: {
          border: 'md',
          borderColor: 'gray.highlight',
          ':hover': {
            borderColor: 'gray.secondary',
          },
          _focusWithin: {
            borderColor: 'colorPalette.primary',
          },
        },
      },
      filled: {
        root: {
          bg: 'colorPalette.muted',
          ':hover': {
            bg: 'colorPalette.subtle',
          },
          _focusWithin: {
            bg: 'colorPalette.subtle',
          },
        },
        label: {
          color: {
            _DEFAULT: 'colorPalette.500',
            _dark: 'colorPalette.400',
          },
        },
        input: {
          color: {
            _DEFAULT: 'colorPalette.500',
            _dark: 'colorPalette.400',
          },
          transition: 'colors',
        },
      },
      underlined: {
        root: {
          px: '1.5',
          '::before': {
            content: '""',
            position: 'absolute',
            insetBlockEnd: 0,
            insetInlineStart: 0,
            w: '100%',
            h: '1px',
            bg: 'gray.highlight',
          },
          '::after': {
            content: '""',
            position: 'absolute',
            insetBlockEnd: -1,
            insetInlineStart: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            h: '2px',
            bg: 'colorPalette.primary',
            transition: 'width 0.2s ease',
          },
          _focusWithin: {
            '::after': {
              width: '100%',
            },
          },
        },
      },
    },
    disabled: {
      true: {
        root: {
          pointerEvents: 'none',
          opacity: 0.6,
        },
      },
    },
    invaild: {
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
        },
      },
      'float-inside': {
        label: {
          [WITHIN_SELECTOR]: {
            transform: 'translateY(-90%) scale(0.8)',
          },
        },
        input: {
          pb: 0,
        },
      },
      inside: {
        label: {
          insetBlockStart: '50%',
          transform: 'translateY(-90%) scale(0.8)',
        },
        input: {
          pb: 0,
        },
      },
    },
  },
  compoundVariants: [
    {
      labelPlacement: ['float-outside', 'float-inside'],
      css: {
        label: {
          transitionProperty: 'inset, font-size, transform',
          transform: 'translateY(-50%) scale(1)',
          insetBlockStart: '50%',
          transitionDuration: '0.2s',
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
          pt: '0.9em',
        },
        prefix: {
          pt: '0.9em',
        },
        suffix: {
          pt: '0.9em',
        },
        clearBtn: {
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
          pt: '1em',
        },
        prefix: {
          pt: '1em',
        },
        suffix: {
          pt: '1em',
        },
        clearBtn: {
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
          pt: '1.2em',
        },
        prefix: {
          pt: '1.2em',
        },
        suffix: {
          pt: '1.2em',
        },
        clearBtn: {
          mt: '1.2em',
        },
      },
    },
    {
      radius: 'full',
      variant: ['filled', 'outlined'],
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
      variant: ['filled', 'outlined'],
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
      invaild: false,
      variant: ['outlined', 'underlined'],
      css: {
        label: {
          [WITHIN_SELECTOR]: {
            color: 'colorPalette.primary',
          },
        },
      },
    },
    {
      invaild: true,
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
      invaild: true,
      variant: 'filled',
      css: {
        root: {
          colorPalette: 'red',
        },
        input: {
          colorPalette: 'red',
        },
        label: {
          colorPalette: 'red',
        },
      },
    },
    {
      invaild: true,
      variant: 'outlined',
      css: {
        root: {
          borderColor: 'red.primary',
          ':hover': {
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
      invaild: true,
      variant: 'underlined',
      css: {
        root: {
          '::after': {
            bg: 'red.primary',
          },
          _focusWithin: {
            '::after': {
              bg: 'red.primary',
            },
          },
        },
        input: {
          color: 'red.primary',
        },
      },
    },
  ],
})

export type InputRecipe = typeof inputRecipe
export type InputVariants = RecipeVariants<InputRecipe>
