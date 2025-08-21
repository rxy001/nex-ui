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
      boxSizing: 'border-box',
      maxWidth: 'fit-content',
      WebkitTapHighlightColor: 'transparent',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      zIndex: 1,
      cursor: 'inherit',
      _hover: {
        '& + *': {
          borderColor: 'colorPalette.secondary',
        },
      },
      _focusVisibleRing: {
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
    inGroup: {
      true: {},
    },
  },
  compoundVariants: [
    {
      inGroup: true,
      size: 'sm',
      css: {
        root: {
          ml: '-1',
          mr: '1',
        },
      },
    },
    {
      inGroup: true,
      size: 'md',
      css: {
        root: {
          ml: '-1.5',
          mr: '1.5',
        },
      },
    },
    {
      inGroup: true,
      size: 'lg',
      css: {
        root: {
          ml: '-2',
          mr: '2',
        },
      },
    },
  ],
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
      gap: '2',
    },
    label: {
      m: 0,
      fs: 'lg',
      fontWeight: 'normal',
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
  },
})

export type RadioRecipe = typeof radioRecipe
export type RadioVariants = RecipeVariants<RadioRecipe>

export type RadioGroupRecipe = typeof radioGroupRecipe
export type RadioGroupVariants = RecipeVariants<RadioGroupRecipe>
