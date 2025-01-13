import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlot } from './shared'

export const switchRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      h: 32,
      alignItems: 'center',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      m: 0,
    },
    track: {
      bg: 'gray.200',
      display: 'inline-flex',
      borderRadius: 'full',
      alignItems: 'center',
      boxSizing: 'border-box',
      transition: 'all 0.3s',
      overflow: 'hidden',
      position: 'relative',
      px: '1',
    },
    thumb: {
      bg: 'white',
      borderRadius: 'inherit',
      transition: 'all 0.3s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      transition: 'all 0.2s',
      left: '1',
      opacity: 0,
      scale: 0,
    },
    endIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      transition: 'all 0.25s',
      right: '1',
    },
  },
  variants: {
    color: toSlot(colorVariant, 'track'),
    size: {
      sm: {
        track: {
          w: '10',
          h: '6',
        },
        thumb: {
          w: '4',
          h: '4',
        },
        startIcon: {
          w: '4',
          h: '4',
        },
        endIcon: {
          w: '4',
          h: '4',
        },
      },
      md: {
        track: {
          w: '12',
          h: '7',
        },
        thumb: {
          w: '5',
          h: '5',
        },
        startIcon: {
          w: '5',
          h: '5',
        },
        endIcon: {
          w: '5',
          h: '5',
        },
      },
      lg: {
        track: {
          w: '14',
          h: '8',
        },
        thumb: {
          w: '6',
          h: '6',
        },
        startIcon: {
          w: '6',
          h: '6',
        },
        endIcon: {
          w: '6',
          h: '6',
        },
      },
    },
    checked: {
      true: {
        thumb: {
          ml: '50%',
        },
        track: {
          bg: 'colorPalette.500',
        },
        startIcon: {
          opacity: 1,
          scale: 1,
        },
        endIcon: {
          opacity: 0,
          transform: 'translateX(100%)',
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
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
})
