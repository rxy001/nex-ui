import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const accordionRecipe = defineRecipe({
  base: {
    w: 'full',
    overflow: 'hidden',
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
      fs: 18,
      minHeight: 48,
      fontWeight: 'normal',
    },
    trigger: {
      w: 'full',
      h: 'inherit',
      minHeight: 'inherit',
      textAlign: 'left',
      justifyContent: 'space-between',
      color: 'inherit',
      px: '4',
      fs: 'inherit',
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
