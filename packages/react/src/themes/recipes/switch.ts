import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, disabledVariant, toSlots } from './shared'
import type { RecipeVariants } from '@nex-ui/system'

export const switchRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      pos: 'relative',
      h: '8',
      alignItems: 'center',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    },
    input: {
      pos: 'absolute',
      inset: 0,
      opacity: 0,
      zIndex: 1,
      cursor: 'inherit',
      _focusVisibleRing: {
        '& + *': {
          outline: '{borders.md} {colors.colorPalette.primary}',
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
      overflow: 'hidden',
      pos: 'relative',
      px: '1',
    },
    thumb: {
      bg: 'white',
      borderRadius: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pos: 'absolute',
      insetInlineStart: '1',
      opacity: 0,
      scale: 0,
    },
    endIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pos: 'absolute',
      insetInlineEnd: '1',
    },
    label: {
      ml: '2',
    },
  },
  variants: {
    color: toSlots(colorVariant, 'track', 'input'),
    size: {
      sm: {
        track: {
          w: '10',
          h: '6',
          fs: 'xs',
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
          fs: 'sm',
        },
      },
      md: {
        track: {
          w: '12',
          h: '7',
          fs: 'md',
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
          fs: 'md',
        },
      },
      lg: {
        track: {
          w: '14',
          h: '8',
          fs: 'lg',
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
          fs: 'lg',
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
    disabled: toSlots(disabledVariant, 'root'),
    disableAnimation: {
      false: {
        track: {
          transition: 'colors',
        },
        thumb: {
          transition: 'margin',
        },
        startIcon: {
          transition: 'scale',
        },
        endIcon: {
          transition: 'transform',
        },
      },
    },
  },
})

export type SwitchRecipe = typeof switchRecipe
export type SwitchVariants = RecipeVariants<SwitchRecipe>
