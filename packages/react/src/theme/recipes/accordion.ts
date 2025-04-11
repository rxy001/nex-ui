import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'

export const accordionRecipe = defineRecipe({
  base: {
    width: 'full',
  },
})

export const accordionItemRecipe = defineSlotRecipe({
  slots: {
    root: {
      borderBottom: '1px solid {colors.gray.muted}',
    },
    heading: {
      m: 0,
      fontSize: 18,
      minHeight: 48,
    },
    trigger: {
      width: '100%',
      minHeight: 'inherit',
      height: 'inherit',
      textAlign: 'left',
      display: 'flex',
      background: 'none',
      userSelect: 'none',
      border: 'none',
      outline: 'none',
      color: 'inherit',
      py: 0,
      px: '2',
      cursor: 'pointer',
      alignItems: 'center',
      fontSize: 'inherit',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      ':focus-visible': {
        outline: 'focusVisibleOutline',
      },
    },
    content: {
      p: '2',
      fontSize: 16,
    },
    indicator: {
      display: 'block',
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
    hideDivider: {
      true: {
        root: {
          borderBottom: 'none',
        },
      },
    },
  },
})

export type AccordionRecipe = typeof accordionRecipe

export type AccordionItemRecipe = typeof accordionItemRecipe
