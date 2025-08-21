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
      minHeight: '12',
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      boxSizing: 'border-box',
      w: 'full',
      minHeight: 'inherit',
      px: '4',
      fs: 'xl',
      fontWeight: 'normal',
      _focusVisibleRing: {
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
