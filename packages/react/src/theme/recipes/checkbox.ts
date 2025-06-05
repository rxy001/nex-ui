import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const checkboxRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      boxSizing: 'border-box',
      h: '10',
      p: '2',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit',
      zIndex: 1,
      _focusVisible: {
        '& + *::before': {
          outline: 'focusVisibleOutline',
          outlineOffset: '0.5',
        },
      },
      _hover: {
        '& + *::before': {
          borderColor: 'colorPalette.secondary',
        },
      },
    },
    label: {
      ml: '2',
    },
    checkedIcon: {
      opacity: 0,
      transition: 'all 0.2s linear',
      transform: 'scale(0.4)',
    },
    icon: {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'colorPalette.contrastText',
      '::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        border: 'md',
        borderColor: 'gray.highlight',
        transition: 'colors',
        background: 'transparent',
        zIndex: -2,
      },
      '::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'colorPalette.primary',
        transition: 'all 0.2s linear',
        transform: 'scale(0.4)',
        opacity: 0,
        zIndex: -1,
      },
    },
  },
  variants: {
    checked: {
      true: {
        checkedIcon: {
          opacity: 1,
          transform: 'scale(1)',
        },
        icon: {
          '::after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
    size: {
      sm: {
        icon: {
          w: '4',
          h: '4',
          fs: 'sm',
        },
        label: {
          fs: 'md',
        },
      },
      md: {
        icon: {
          w: '5',
          h: '5',
          fs: 'md',
        },
        label: {
          fs: 'md',
        },
      },
      lg: {
        icon: {
          w: '6',
          h: '6',
          fs: 'xl',
        },
        label: {
          fs: 'xl',
        },
      },
    },
    radius: {
      sm: {
        icon: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .5)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .5)',
          },
        },
      },
      md: {
        icon: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .6)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .6)',
          },
        },
      },
      lg: {
        icon: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .7)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .7)',
          },
        },
      },
      full: {
        icon: {
          '::before': {
            borderRadius: 'full',
          },
          '::after': {
            borderRadius: 'full',
          },
        },
      },
    },
    disabled: {
      true: {
        root: {
          opacity: 0.6,
          pointerEvents: 'none',
        },
      },
    },
    color: toSlots(colorVariant, 'input', 'icon'),
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
    radius: 'md',
  },
})

export type CheckboxRecipe = typeof checkboxRecipe
export type CheckboxVariants = RecipeVariants<CheckboxRecipe>
