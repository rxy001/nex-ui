import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const accordionRecipe = defineRecipe({
  base: {
    w: 'full',
  },
  variants: {
    variant: {
      outlined: {
        border: '1px solid {colors.gray.highlight}',
        borderRadius: 'md',
      },
    },
  },
})

export const accordionItemRecipe = defineSlotRecipe({
  slots: {
    root: {},
    heading: {
      m: 0,
      height: 48,
    },
    trigger: {
      all: 'unset',
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      userSelect: 'none',
      cursor: 'pointer',
      w: 'full',
      h: 'full',
      px: '4',
      fs: 'xl',
      fontWeight: 'normal',
      justifyContent: 'space-between',
      _focusVisible: {
        outline: 'focusVisibleOutline',
      },
    },
    content: {
      px: '4',
      py: '2',
      fs: 16,
    },
    indicator: {
      fs: '1.25rem',
      display: 'flex',
    },
  },
  variants: {
    disabled: {
      true: {
        root: {
          opacity: 0.6,
          pointerEvents: 'none',
        },
      },
    },
    variant: {
      underlined: {
        root: {
          borderBottom: '1px solid {colors.gray.highlight}',
        },
      },
      outlined: {
        root: {
          ':not(:last-child)': {
            borderBottom: '1px solid {colors.gray.highlight}',
          },
        },
      },
    },
  },
})

export type AccordionRecipe = typeof accordionRecipe

export type AccordionItemRecipe = typeof accordionItemRecipe
export type AccordionItemVariants = RecipeVariants<AccordionItemRecipe>
