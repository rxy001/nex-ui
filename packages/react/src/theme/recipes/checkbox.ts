import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlot } from './shared'

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
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      zIndex: 2,
      cursor: 'inherit',
    },
    label: {
      fs: 'inherit',
    },
    icon: {
      opacity: 0,
      transition: 'all 0.3s',
      position: 'relative',
      zIndex: 1,
      color: 'colorPalette.contrastText',
    },
    iconContainer: {
      display: 'inline-flex',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderStyle: 'solid',
        borderColor: 'gray.200',
        borderWidth: 'md',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'colorPalette.500',
        transition: 'all 0.3s',
        opacity: 0,
      },
    },
  },
  variants: {
    checked: {
      true: {
        icon: {
          opacity: 1,
        },
        iconContainer: {
          '&::after': {
            opacity: 1,
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          fs: '14px',
        },
        icon: {
          fs: '1.143em',
        },
      },
      md: {
        root: {
          fs: '16px',
        },
        icon: {
          fs: '1.25em',
        },
      },
      lg: {
        root: {
          fs: '18px',
        },
        icon: {
          fs: '1.33334em',
        },
      },
    },
    radius: {
      none: {},
      sm: {
        iconContainer: {
          '&::before': {
            borderRadius: '4px',
          },
          '&::after': {
            borderRadius: '4px',
          },
        },
      },
      md: {
        iconContainer: {
          '&::before': {
            borderRadius: '6px',
          },
          '&::after': {
            borderRadius: '6px',
          },
        },
      },
      lg: {
        iconContainer: {
          '&::before': {
            borderRadius: '8px',
          },
          '&::after': {
            borderRadius: '8px',
          },
        },
      },
      full: {
        iconContainer: {
          '&::before': {
            borderRadius: 'full',
          },
          '&::after': {
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
    color: toSlot(colorVariant, 'iconContainer', 'icon'),
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
    radius: 'md',
  },
})
