import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots, disabledVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const checkboxGroupRecipe = defineSlotRecipe({
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

export const checkboxRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      boxSizing: 'border-box',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      maxWidth: 'fit-content',
    },
    input: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      cursor: 'inherit',
      zIndex: 1,
      _focusVisibleRing: {
        '& + *::before': {
          outline: '{borders.md} {colors.colorPalette.primary}',
          outlineOffset: '0.5',
        },
      },
      _hover: {
        '& + *::before': {
          borderColor: 'gray.secondary',
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
        root: {
          h: '6',
          p: '1',
        },
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
        root: {
          h: '8',
          p: '1.5',
        },
        icon: {
          w: '5',
          h: '5',
          fs: 'md',
        },
        label: {
          fs: 'lg',
        },
      },
      lg: {
        root: {
          h: '10',
          p: '2',
        },
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
      none: {
        icon: {
          '::before': {
            borderRadius: 'none',
          },
          '::after': {
            borderRadius: 'none',
          },
        },
      },
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
    disabled: toSlots(disabledVariant, 'root'),
    indeterminate: {
      true: {
        icon: {
          '::after': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
    },
    color: toSlots(colorVariant, 'input', 'icon'),
    inGroup: {
      true: {
        root: {},
      },
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
    color: 'blue',
    size: 'md',
    radius: 'md',
  },
})

export type CheckboxRecipe = typeof checkboxRecipe
export type CheckboxVariants = RecipeVariants<CheckboxRecipe>
export type CheckboxGroupRecipe = typeof checkboxGroupRecipe
export type CheckboxGroupVariants = RecipeVariants<CheckboxGroupRecipe>
