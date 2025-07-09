import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const dialogRecipe = defineSlotRecipe({
  slots: {
    root: {},
    backdrop: {},
    panel: {},
  },
  variants: {
    scroll: {
      outside: {
        panel: {
          overflow: 'hidden auto',
        },
      },
    },
    placement: {
      top: {
        panel: {
          alignItems: 'flex-start',
        },
      },
      center: {
        panel: {
          alignItems: 'center',
        },
      },
      bottom: {
        panel: {
          alignItems: 'flex-end',
        },
      },
    },
  },
})

export const dialogContentRecipe = defineSlotRecipe({
  slots: {
    content: {},
    closeButton: {
      position: 'absolute',
      insetInlineEnd: '2',
      insetBlockStart: '2',
      fs: '1.3em',
      bg: 'transparent',
      border: 'none',
      outline: 'none',
      display: 'inline-flex',
      p: '1.5',
      overflow: 'hidden',
      borderRadius: 'full',
      transition: 'colors',
      color: 'gray.400',
      _hover: {
        bg: 'gray.muted',
      },
      _focusVisible: {
        outline: 'focusVisibleOutline',
      },
    },
  },
  variants: {
    maxWidth: {
      xs: {
        content: {
          maxWidth: 300,
        },
      },
      sm: {
        content: {
          maxWidth: 450,
        },
      },
      md: {
        content: {
          maxWidth: 600,
        },
      },
      lg: {
        content: {
          maxWidth: 750,
        },
      },
      xl: {
        content: {
          maxWidth: 900,
        },
      },
      full: {
        content: {
          maxWidth: '100vw',
        },
      },
    },
    scroll: {
      inside: {
        content: {
          maxHeight: 'calc(100% - {spaces.15} * 2)',
        },
      },
    },
    fullScreen: {
      true: {
        content: {
          w: '100%',
          maxHeight: undefined,
          maxWidth: 'full',
          m: 0,
          borderRadius: 0,
        },
      },
    },
  },
})

export const dialogHeaderRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
    fontWeight: 500,
    fs: 'xl',
    lineHeight: '1.5556',
  },
})

export const dialogBodyRecipe = defineRecipe({
  base: {
    py: '2',
    px: '6',
  },
  variants: {
    scroll: {
      inside: {
        overflow: 'auto',
      },
    },
  },
})

export const dialogFooterRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
  },
})

export type DialogRecipe = typeof dialogRecipe
export type DialogVariants = RecipeVariants<DialogRecipe>

export type DialogContentRecipe = typeof dialogContentRecipe
export type DialogContentVariants = RecipeVariants<DialogContentRecipe>

export type DialogHeaderRecipe = typeof dialogHeaderRecipe
export type DialogHeaderVariants = RecipeVariants<DialogHeaderRecipe>

export type DialogBodyRecipe = typeof dialogBodyRecipe
export type DialogBodyVariants = RecipeVariants<DialogBodyRecipe>

export type DialogFooterRecipe = typeof dialogFooterRecipe
export type DialogFooterVariants = RecipeVariants<DialogFooterRecipe>
