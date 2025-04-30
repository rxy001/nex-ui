import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const accordionRecipe = defineRecipe({
  base: {
    w: 'full',
  },
  variants: {
    variant: {
      outlined: {
        border: '1px solid {colors.gray.muted}',
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
      fs: 18,
      minHeight: 48,
      fontWeight: 'normal',
    },
    trigger: {
      w: 'full',
      h: 'inherit',
      minHeight: 'inherit',
      textAlign: 'left',
      display: 'flex',
      background: 'none',
      userSelect: 'none',
      border: 'none',
      outline: 'none',
      color: 'inherit',
      py: 0,
      px: '4',
      cursor: 'pointer',
      alignItems: 'center',
      fs: 'inherit',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      fontWeight: 'inherit',
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
          opacity: 0.5,
          pointerEvents: 'none',
        },
      },
    },
    variant: {
      underlined: {
        root: {
          borderBottom: '1px solid {colors.gray.muted}',
        },
      },
      outlined: {
        root: {
          ':not(:last-child)': {
            borderBottom: '1px solid {colors.gray.muted}',
          },
        },
      },
    },
  },
})

export type AccordionRecipe = typeof accordionRecipe

export type AccordionItemRecipe = typeof accordionItemRecipe
export type AccordionItemVariants = RecipeVariants<AccordionItemRecipe>
