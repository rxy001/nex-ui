import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const modalRecipe = defineSlotRecipe({
  slots: {
    root: {
      position: 'fixed',
      inset: 0,
      zIndex: 'modal',
    },
    backdrop: {
      position: 'fixed',
      inset: 0,
      bg: 'black/50',
    },
    container: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  variants: {
    scroll: {
      true: {
        container: {
          overflow: 'hidden auto',
        },
      },
    },
    placement: {
      top: {
        container: {
          alignItems: 'flex-start',
        },
      },
      center: {
        container: {
          alignItems: 'center',
        },
      },
      bottom: {
        container: {
          alignItems: 'flex-end',
        },
      },
    },
  },
})

export const modalContentRecipe = defineSlotRecipe({
  slots: {
    content: {
      width: 'full',
      bg: {
        _DEFAULT: 'white',
        _dark: '#18181b',
      },
      borderRadius: 'lg',
      position: 'relative',
      my: '15',
      mx: '6',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'md',
    },
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
  },
})

export const modalHeaderRecipe = defineRecipe({
  base: {
    w: 'full',
    m: 0,
    boxSizing: 'border-box',
  },
  variants: {
    size: {
      md: {
        py: '4',
        px: '6',
        fontWeight: 500,
        fs: 'xl',
      },
    },
  },
})

export const modalBodyRecipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    height: '100%',
  },
  variants: {
    size: {
      md: {
        py: '2',
        px: '6',
      },
    },
    scroll: {
      true: {
        overflow: 'auto',
      },
    },
  },
})

export const modalFooterRecipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5',
  },
  variants: {
    size: {
      md: {
        py: '4',
        px: '6',
      },
    },
  },
})

export type ModalRecipe = typeof modalRecipe
export type ModalVariants = RecipeVariants<ModalRecipe>

export type ModalContentRecipe = typeof modalContentRecipe
export type ModalContentVariants = RecipeVariants<ModalContentRecipe>

export type ModalHeaderRecipe = typeof modalHeaderRecipe
export type ModalHeaderVariants = RecipeVariants<ModalHeaderRecipe>

export type ModalBodyRecipe = typeof modalBodyRecipe
export type ModalBodyVariants = RecipeVariants<ModalBodyRecipe>

export type ModalFooterRecipe = typeof modalFooterRecipe
export type ModalFooterVariants = RecipeVariants<ModalFooterRecipe>
