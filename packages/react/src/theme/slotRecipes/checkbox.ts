import { defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'
import { colorVariant, toSlot } from '../shared'

export const checkboxRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      boxSizing: 'border-box',
      gap: '2',
      h: '10',
      p: '2',
      cursor: 'pointer',
      _hover: {
        '& span:first-of-type::before': {
          borderColor: 'colorPalette.secondary',
        },
      },
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit',
    },
    label: {
      fs: 'inherit',
    },
    icon: {
      opacity: 0,
      transition: 'all 0.2s linear',
      position: 'relative',
      zIndex: 1,
      color: 'colorPalette.contrastText',
      transform: 'scale(0.4)',
    },
    iconContainer: {
      display: 'inline-flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      '::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        border: 'md',
        borderColor: 'gray.highlight',
        transition: 'colors',
      },
      '::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'colorPalette.primary',
        transition: 'all 0.2s linear',
        transform: 'scale(0.4)',
        opacity: 0,
      },
    },
  },
  variants: {
    checked: {
      true: {
        icon: {
          opacity: 1,
          transform: 'scale(1)',
        },
        iconContainer: {
          '::after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          fs: 'md',
        },
        iconContainer: {
          w: '4',
          h: '4',
        },
        icon: {
          fs: '1.15em',
        },
      },
      md: {
        root: {
          fs: 'lg',
        },
        iconContainer: {
          w: '5',
          h: '5',
        },
        icon: {
          fs: '1.25em',
        },
      },
      lg: {
        root: {
          fs: 'xl',
        },
        iconContainer: {
          w: '6',
          h: '6',
        },
        icon: {
          fs: '1.35em',
        },
      },
    },
    radius: {
      sm: {
        iconContainer: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .5)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .5)',
          },
        },
      },
      md: {
        iconContainer: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .6)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .6)',
          },
        },
      },
      lg: {
        iconContainer: {
          '::before': {
            borderRadius: 'calc({radii.lg} * .7)',
          },
          '::after': {
            borderRadius: 'calc({radii.lg} * .7)',
          },
        },
      },
      full: {
        iconContainer: {
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
          cursor: 'not-allowed',
        },
      },
    },
    color: toSlot(colorVariant, 'root', 'iconContainer', 'icon'),
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
    radius: 'md',
  },
})

export type CheckboxRecipe = typeof checkboxRecipe
export type CheckboxVariants = RecipeVariants<CheckboxRecipe>
