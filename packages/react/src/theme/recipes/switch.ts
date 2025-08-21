import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const switchRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      h: '8',
      alignItems: 'center',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      zIndex: 1,
      cursor: 'inherit',
      _focusVisible: {
        '& + *': {
          outline: 'focusVisibleOutline',
          outlineOffset: '0.5',
        },
      },
    },
    track: {
      bg: {
        _DEFAULT: 'gray.200',
        _dark: 'gray.500',
      },
      display: 'inline-flex',
      borderRadius: 'full',
      alignItems: 'center',
      boxSizing: 'border-box',
      transition: 'colors',
      overflow: 'hidden',
      position: 'relative',
      px: '1',
    },
    thumb: {
      bg: 'white',
      borderRadius: 'inherit',
      transition: 'margin',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      transition: 'scale',
      insetInlineStart: '1',
      opacity: 0,
      scale: 0,
    },
    endIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      transition: 'transform',
      insetInlineEnd: '1',
    },
    label: {
      ml: '2',
    },
  },
  variants: {
    color: toSlots(colorVariant, 'track'),
    size: {
      sm: {
        track: {
          w: '10',
          h: '6',
          fs: 'sm',
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
        label: {
          fs: 'md',
        },
      },
      md: {
        track: {
          w: '12',
          h: '7',
          fs: 'lg',
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
        label: {
          fs: 'lg',
        },
      },
      lg: {
        track: {
          w: '14',
          h: '8',
          fs: 'xl',
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
        label: {
          fs: 'xl',
        },
      },
    },
    checked: {
      true: {
        thumb: {
          ml: '50%',
        },
        track: {
          bg: 'colorPalette.primary',
        },
        startIcon: {
          opacity: 1,
          scale: '1',
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
          pointerEvents: 'none',
        },
      },
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
})

export type SwitchRecipe = typeof switchRecipe
export type SwitchVariants = RecipeVariants<SwitchRecipe>
