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
      boxShadow: 'lg',
      maxW: 'calc(100vw - {spaces.6} * 2)',
      pos: 'relative',
    },
    closeButton: {
      pos: 'absolute',
      insetInlineEnd: '2',
      insetBlockStart: '2',
      fs: '1.25em',
      p: '1.5',
      overflow: 'hidden',
      borderRadius: 'full',
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
    radius: {
      none: {
        paper: {
          borderRadius: 'none',
        },
      },
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
    },
    scroll: {
      outside: {
        root: {
          overflow: 'hidden auto',
        },
      },
      inside: {
        paper: {
          maxH: 'calc(100vh - {spaces.15} * 2)',
        },
      },
    },
    size: {
      xs: {
        paper: {
          w: 'xs',
        },
      },
      sm: {
        paper: {
          w: 'md',
        },
      },
      md: {
        paper: {
          w: 'xl',
        },
      },
      lg: {
        paper: {
          w: '2xl',
        },
      },
      xl: {
        paper: {
          w: '4xl',
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
          borderRadius: 'none',
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
    disableAnimation: {
      false: {
        closeButton: {
          transition: 'colors',
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
          maxH: '100vh',
        },
      },
    },
  ],
})

export const dialogHeaderRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
    fontWeight: 'medium',
    fs: 'lg',
    lh: 'base',
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
