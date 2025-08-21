import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const dialogRootRecipe = defineSlotRecipe({
  slots: {
    root: {},
    backdrop: {},
  },
})

export const dialogContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      my: '15',
      mx: '6',
      borderRadius: 'lg',
      boxShadow: 'lg',
    },
    closeButton: {
      all: 'unset',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'absolute',
      insetInlineEnd: '2',
      insetBlockStart: '2',
      fs: '1.3em',
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
    size: {
      xs: {
        paper: {
          maxWidth: 300,
        },
      },
      sm: {
        paper: {
          maxWidth: 450,
        },
      },
      md: {
        paper: {
          maxWidth: 600,
        },
      },
      lg: {
        paper: {
          maxWidth: 750,
        },
      },
      xl: {
        paper: {
          maxWidth: 900,
        },
      },
      full: {
        paper: {
          maxWidth: '100vw',
        },
      },
    },
    scroll: {
      outside: {
        root: {
          overflow: 'hidden auto',
        },
      },
      inside: {
        paper: {
          maxHeight: 'calc(100% - {spaces.15} * 2)',
        },
      },
    },
    fullScreen: {
      true: {
        paper: {
          w: 'full',
          h: 'full',
          maxHeight: undefined,
          maxWidth: 'full',
          m: 0,
          borderRadius: 0,
        },
      },
    },
    placement: {
      top: {
        root: {
          alignItems: 'flex-start',
        },
      },
      center: {
        root: {
          alignItems: 'center',
        },
      },
      bottom: {
        root: {
          alignItems: 'flex-end',
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

export type DialogRootRecipe = typeof dialogRootRecipe
export type DialogRootVariants = RecipeVariants<DialogRootRecipe>

export type DialogContentRecipe = typeof dialogContentRecipe
export type DialogContentVariants = RecipeVariants<DialogContentRecipe>

export type DialogHeaderRecipe = typeof dialogHeaderRecipe

export type DialogBodyRecipe = typeof dialogBodyRecipe

export type DialogFooterRecipe = typeof dialogFooterRecipe
