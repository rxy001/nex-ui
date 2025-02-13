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
      cursor: 'pointer',
      ':hover span:first-of-type::before': {
        borderColor: 'colorPalette.filled.hover',
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
      transition: 'opacity',
      position: 'relative',
      zIndex: 1,
      color: 'colorPalette.filled.contrastText',
      fs: '1.1em',
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
        borderColor: 'gray.200',
        transition: 'colors',
      },
      '::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'colorPalette.filled.fg',
        transition: 'opacity',
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
          '::after': {
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
        iconContainer: {
          w: '4',
          h: '4',
        },
      },
      md: {
        root: {
          fs: '16px',
        },
        iconContainer: {
          w: '5',
          h: '5',
        },
      },
      lg: {
        root: {
          fs: '18px',
        },
        iconContainer: {
          w: '6',
          h: '6',
        },
      },
    },
    radius: {
      none: {},
      sm: {
        iconContainer: {
          '::before': {
            borderRadius: '4px',
          },
          '::after': {
            borderRadius: '4px',
          },
        },
      },
      md: {
        iconContainer: {
          '::before': {
            borderRadius: '6px',
          },
          '::after': {
            borderRadius: '6px',
          },
        },
      },
      lg: {
        iconContainer: {
          '::before': {
            borderRadius: '8px',
          },
          '::after': {
            borderRadius: '8px',
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
