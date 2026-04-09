import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import { disabledVariant, toSlots } from './shared'
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
      underlined: {},
    },
  },
})

export const accordionItemRecipe = defineSlotRecipe({
  slots: {
    root: {},
    heading: {
      m: 0,
      minH: '12',
    },
    trigger: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pos: 'relative',
      boxSizing: 'border-box',
      w: 'full',
      minH: 'inherit',
      px: '4',
      fs: 'lg',
      fontWeight: 'normal',
      _focusVisibleRing: {
        outline: 'focusVisibleOutline',
      },
    },
    content: {
      px: '4',
      py: '2',
      fs: 'md',
    },
    indicator: {
      fs: 'xl',
      display: 'flex',
    },
  },
  variants: {
    disabled: toSlots(disabledVariant, 'root'),
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
export type AccordionVariants = RecipeVariants<AccordionRecipe>

export type AccordionItemRecipe = typeof accordionItemRecipe
export type AccordionItemVariants = RecipeVariants<AccordionItemRecipe>
