import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const dialogContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      pos: 'fixed',
      zIndex: 'dialog',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      py: '15',
    },
    paper: {
      borderRadius: 'lg',
      boxShadow: 'lg',
      maxW: 'calc(100vw - {spaces.6} * 2)',
      pos: 'relative',
    },
    closeButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      _focusVisibleRing: {
        outline: 'focusVisibleOutline',
      },
    },
    backdrop: {},
  },
  variants: {
    scroll: {
      outside: {
        root: {
          overflow: 'hidden auto',
        },
      },
      inside: {
        paper: {
          maxHeight: 'calc(100vh - {spaces.15} * 2)',
        },
      },
    },
    size: {
      xs: {
        paper: {
          width: 300,
        },
      },
      sm: {
        paper: {
          width: 450,
        },
      },
      md: {
        paper: {
          width: 600,
        },
      },
      lg: {
        paper: {
          width: 750,
        },
      },
      xl: {
        paper: {
          width: 900,
        },
      },
      full: {
        root: {
          py: 0,
        },
        paper: {
          w: '100vw',
          maxW: '100vw',
          minH: '100vh',
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
  compoundVariants: [
    {
      size: 'full',
      scroll: 'inside',
      css: {
        paper: {
          maxHeight: '100vh',
        },
      },
    },
  ],
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

export type DialogContentRecipe = typeof dialogContentRecipe
export type DialogContentVariants = RecipeVariants<DialogContentRecipe>

export type DialogHeaderRecipe = typeof dialogHeaderRecipe

export type DialogBodyRecipe = typeof dialogBodyRecipe

export type DialogFooterRecipe = typeof dialogFooterRecipe
