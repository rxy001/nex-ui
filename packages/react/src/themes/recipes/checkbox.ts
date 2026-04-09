import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots, disabledVariant } from './shared'
import type { RecipeVariants } from '@nex-ui/system'

export const checkboxGroupRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2',
    },
    label: {
      fs: 'md',
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
      pos: 'relative',
      alignItems: 'center',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      maxW: 'fit',
    },
    input: {
      pos: 'absolute',
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
    },
    icon: {
      pos: 'relative',
      color: 'colorPalette.contrastText',
      '::before': {
        content: '""',
        pos: 'absolute',
        inset: 0,
        border: 'md',
        borderColor: 'gray.highlight',
        background: 'transparent',
        zIndex: -2,
      },
      '::after': {
        content: '""',
        pos: 'absolute',
        inset: 0,
        bg: 'colorPalette.primary',
        opacity: 0,
        zIndex: -1,
      },
    },
  },
  variants: {
    disableAnimation: {
      false: {
        checkedIcon: {
          transition: 'all',
          transitionTimingFunction: 'linear',
          transform: 'scale(0.4)',
        },
        icon: {
          '::before': {
            transition: 'colors',
          },
          '::after': {
            transition: 'all',
            transitionTimingFunction: 'linear',
            transform: 'scale(0.4)',
          },
        },
      },
    },
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
          fs: 'xs',
        },
        label: {
          fs: 'sm',
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
          fs: 'sm',
        },
        label: {
          fs: 'md',
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
          fs: 'lg',
        },
        label: {
          fs: 'lg',
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
            borderRadius: 'calc({radii.xl} * .5)',
          },
          '::after': {
            borderRadius: 'calc({radii.xl} * .5)',
          },
        },
      },
      md: {
        icon: {
          '::before': {
            borderRadius: 'calc({radii.xl} * .6)',
          },
          '::after': {
            borderRadius: 'calc({radii.xl} * .6)',
          },
        },
      },
      lg: {
        icon: {
          '::before': {
            borderRadius: 'calc({radii.xl} * .7)',
          },
          '::after': {
            borderRadius: 'calc({radii.xl} * .7)',
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
})

export type CheckboxRecipe = typeof checkboxRecipe
export type CheckboxVariants = RecipeVariants<CheckboxRecipe>
export type CheckboxGroupRecipe = typeof checkboxGroupRecipe
export type CheckboxGroupVariants = RecipeVariants<CheckboxGroupRecipe>
