import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const radioRecipe = defineSlotRecipe({
  slots: {
    root: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
      maxWidth: 'fit-content',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      m: 0,
      cursor: 'inherit',
      zIndex: 1,
      _hover: {
        '& + *': {
          borderColor: 'colorPalette.secondary',
        },
      },
      _focusVisible: {
        '& + *': {
          outline: 'focusVisibleOutline',
          outlineOffset: '0.5',
        },
      },
    },
    dot: {
      borderRadius: 'full',
      border: 'md',
      borderColor: 'gray.highlight',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      transition: 'colors',

      '::before': {
        content: '""',
        display: 'block',
        transform: 'scale(0)',
        borderRadius: 'full',
        backgroundColor: 'colorPalette.primary',
        transition: 'all',
      },
    },
    label: {
      ml: '2',
    },
  },
  variants: {
    color: toSlots(colorVariant, 'dot', 'input'),
    size: {
      sm: {
        root: {
          p: '1',
          h: '6',
        },
        dot: {
          w: '4',
          h: '4',
          '::before': {
            w: '1.5',
            h: '1.5',
          },
        },
        label: {
          fs: 'md',
        },
      },
      md: {
        root: {
          p: '1.5',
          h: '8',
        },
        dot: {
          w: '5',
          h: '5',
          '::before': {
            w: '2',
            h: '2',
          },
        },
        label: {
          fs: 'lg',
        },
      },
      lg: {
        root: {
          p: '2',
          h: '10',
        },
        dot: {
          w: '6',
          h: '6',
          '::before': {
            w: '2.5',
            h: '2.5',
          },
        },
        label: {
          fs: 'xl',
        },
      },
    },
    checked: {
      true: {
        dot: {
          borderColor: 'colorPalette.primary',
          '::before': {
            transform: 'scale(1)',
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
  },
  defaultVariants: {
    size: 'md',
    color: 'blue',
  },
})

export const radioGroupRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      all: 'unset',
    },
    wrapper: {
      display: 'flex',
    },
  },
  variants: {
    orientation: {
      horizontal: {
        wrapper: {
          flexDirection: 'row',
        },
      },
      vertical: {
        wrapper: {
          flexDirection: 'column',
        },
      },
    },
    size: {
      sm: {
        label: {
          fs: 'md',
          p: '1',
        },
      },
      md: {
        label: {
          fs: 'lg',
          p: '1.5',
        },
      },
      lg: {
        label: {
          fs: 'xl',
          p: '2',
        },
      },
    },
  },
})

export type RadioRecipe = typeof radioRecipe
export type RadioVariants = RecipeVariants<RadioRecipe>

export type RadioGroupRecipe = typeof radioGroupRecipe
export type RadioGroupVariants = RecipeVariants<RadioGroupRecipe>
