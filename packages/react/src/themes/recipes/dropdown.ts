import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from './shared'
import type { RecipeVariants } from '@nex-ui/system'

const HIGHLIGHTED = "&[data-highlighted='true']"

export const dropdownContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'dropdown',
    },
    paper: {
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      bg: 'panelBg',
      overflow: 'auto',
    },
  },
  variants: {
    radius: {
      sm: {
        paper: {
          borderRadius: 'lg',
        },
      },
      md: {
        paper: {
          borderRadius: 'xl',
        },
      },
      lg: {
        paper: {
          borderRadius: '2xl',
        },
      },
      none: {
        paper: {
          borderRadius: 'none',
        },
      },
    },
    size: {
      sm: {
        paper: {
          p: '1',
          fs: 'xs',
        },
      },
      md: {
        paper: {
          p: '2',
          fs: 'sm',
        },
      },
      lg: {
        paper: {
          p: '3',
          fs: 'md',
        },
      },
    },
  },
})

export const dropdownItemGroupRecipe = defineRecipe({})

export const dropdownItemRecipe = defineSlotRecipe({
  slots: {
    root: {
      py: '1',
      pl: '2',
      pr: '2',
      borderRadius: 'md',
      color: 'inherit',
      fs: 'inherit',
      textDecoration: 'none',
      _disabled: {
        opacity: 0.6,
      },
      _focusVisibleRing: {
        outline: 'focusVisibleOutline',
        outlineOffset: '0.5',
      },
    },
    shortcut: {
      ml: '5',
      px: '1',
      py: '1px',
      border: 'sm',
      borderColor: 'inherit',
      borderRadius: 'md',
      fs: 'xs',
      opacity: 0.5,
      letterSpacing: 1,
      fontFamily: 'inherit',
      "[data-highlighted='true'] > &": {
        opacity: 1,
      },
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      color: 'inherit',
    },
    startIcon: {
      mr: '1.5',
      fs: '1.15em',
    },
    endIcon: {
      ml: '5',
      fs: '1.15em',
    },
  },
  variants: {
    hasIndicator: {
      true: {
        root: {
          pl: '5',
        },
      },
    },
    variant: {
      outlined: {
        root: {
          border: 'md',
          borderColor: 'transparent',
          bg: 'transparent',
          [HIGHLIGHTED]: {
            borderColor: 'colorPalette.primary',
            color: 'colorPalette.primary',
          },
        },
      },
      solid: {
        root: {
          [HIGHLIGHTED]: {
            bg: 'colorPalette.primary',
            color: 'colorPalette.contrastText',
          },
        },
      },
      ghost: {
        root: {
          [HIGHLIGHTED]: {
            color: 'colorPalette.500',
          },
        },
      },
      faded: {
        root: {
          [HIGHLIGHTED]: {
            color: {
              _DEFAULT: 'colorPalette.600',
              _dark: 'colorPalette.400',
            },
            bg: {
              _DEFAULT: 'colorPalette.100',
              _dark: 'colorPalette.800/50',
            },
          },
        },
      },
    },
    color: toSlots(colorVariant, 'root'),
    disableAnimation: {
      false: {
        root: {
          transition: 'colors',
        },
        shortcut: {
          transition: 'colors',
        },
      },
    },
  },
})

export const dropdownItemGroupLabelRecipe = defineRecipe({
  base: {
    p: '1',
    fs: 'xs',
    color: 'gray.primary',
  },
})

export const dropdownRadioItemRecipe = defineSlotRecipe({
  slots: {
    root: {
      pos: 'relative',
    },
    indicator: {
      pos: 'absolute',
      left: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
})

export const dropdownRadioItemGroupRecipe = defineRecipe({})

export const dropdownCheckboxItemRecipe = defineSlotRecipe({
  slots: {
    root: {
      pos: 'relative',
    },
    indicator: {
      pos: 'absolute',
      left: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
})

export const dropdownCheckboxItemGroupRecipe = defineRecipe({})

export const dropdownTriggerItemRecipe = defineRecipe({
  base: {},
})

export const subDropdownContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      zIndex: 'dropdown',
    },
    paper: {
      boxShadow:
        '0px 0px 5px 0px #00000005,0px 2px 10px 0px #0000000f,0px 0px 1px 0px #0000004d',
      p: '2',
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      bg: 'panelBg',
      overflow: 'auto',
    },
  },
  variants: {
    radius: {
      sm: {
        paper: {
          borderRadius: 'lg',
        },
      },
      md: {
        paper: {
          borderRadius: 'xl',
        },
      },
      lg: {
        paper: {
          borderRadius: '2xl',
        },
      },
      none: {
        paper: {
          borderRadius: 'none',
        },
      },
    },
    size: {
      sm: {
        paper: {
          p: '1',
          fs: 'xs',
        },
      },
      md: {
        paper: {
          p: '2',
          fs: 'sm',
        },
      },
      lg: {
        paper: {
          p: '3',
          fs: 'md',
        },
      },
    },
  },
})

export const dropdownSeparatorRecipe = defineRecipe({})

export type DropdownContentRecipe = typeof dropdownContentRecipe
export type DropdownItemRecipe = typeof dropdownItemRecipe
export type DropdownItemGroupLabelRecipe = typeof dropdownItemGroupLabelRecipe
export type DropdownRadioItemRecipe = typeof dropdownRadioItemRecipe
export type DropdownCheckboxItemRecipe = typeof dropdownCheckboxItemRecipe
export type DropdownItemGroupRecipe = typeof dropdownItemGroupRecipe
export type DropdownRadioItemGroupRecipe = typeof dropdownRadioItemGroupRecipe
export type DropdownCheckboxItemGroupRecipe =
  typeof dropdownCheckboxItemGroupRecipe
export type DropdownTriggerItemRecipe = typeof dropdownTriggerItemRecipe
export type SubDropdownContentRecipe = typeof subDropdownContentRecipe
export type DropdownDividerRecipe = typeof dropdownSeparatorRecipe

export type DropdownItemVariants = RecipeVariants<DropdownItemRecipe>
export type DropdownContentVariants = RecipeVariants<DropdownContentRecipe>
export type SubDropdownContentVariants =
  RecipeVariants<SubDropdownContentRecipe>
