import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const drawerContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      pos: 'fixed',
      inset: '0',
      zIndex: 'drawer',
    },
    paper: {
      boxShadow: 'lg',
      w: '100vw',
      h: '100vh',
      maxW: '100vw',
      maxH: '100vh',
      pos: 'relative',
    },
    closeButton: {
      pos: 'absolute',
      insetInlineEnd: '2',
      insetBlockStart: '2',
      fs: '1.3em',
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
          '--drawer-border-radius': 'none',
        },
      },
      sm: {
        paper: {
          '--drawer-border-radius': '{radii.lg}',
        },
      },
      md: {
        paper: {
          '--drawer-border-radius': '{radii.xl}',
        },
      },
      lg: {
        paper: {
          '--drawer-border-radius': '{radii.2xl}',
        },
      },
    },
    placement: {
      left: {
        root: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        paper: {
          borderTopRightRadius: 'var(--drawer-border-radius)',
          borderBottomRightRadius: 'var(--drawer-border-radius)',
        },
      },
      right: {
        root: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        paper: {
          borderTopLeftRadius: 'var(--drawer-border-radius)',
          borderBottomLeftRadius: 'var(--drawer-border-radius)',
        },
      },
      top: {
        root: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
        paper: {
          borderBottomLeftRadius: 'var(--drawer-border-radius)',
          borderBottomRightRadius: 'var(--drawer-border-radius)',
        },
      },
      bottom: {
        root: {
          flexDirection: 'column',
          justifyContent: 'flex-end',
        },
        paper: {
          borderTopLeftRadius: 'var(--drawer-border-radius)',
          borderTopRightRadius: 'var(--drawer-border-radius)',
        },
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: {
        paper: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
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
      placement: ['left', 'right'],
      size: 'xs',
      css: {
        paper: {
          w: '2xs',
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'sm',
      css: {
        paper: {
          w: 'sm',
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'md',
      css: {
        paper: {
          w: '30rem',
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'lg',
      css: {
        paper: {
          w: 'xl',
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'xl',
      css: {
        paper: {
          w: '2xl',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xs',
      css: {
        paper: {
          h: '2xs',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'sm',
      css: {
        paper: {
          h: 'sm',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'md',
      css: {
        paper: {
          h: '30rem',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'lg',
      css: {
        paper: {
          h: 'xl',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xl',
      css: {
        paper: {
          h: '2xl',
        },
      },
    },
  ],
})

export const drawerHeaderRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
    fontWeight: 'medium',
    fs: 'lg',
    lh: 'base',
  },
})

export const drawerBodyRecipe = defineRecipe({
  base: {
    py: '2',
    px: '6',
    overflowY: 'auto',
  },
})

export const drawerFooterRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
  },
})

export type DrawerContentRecipe = typeof drawerContentRecipe
export type DrawerContentVariants = RecipeVariants<DrawerContentRecipe>

export type DrawerHeaderRecipe = typeof drawerHeaderRecipe

export type DrawerBodyRecipe = typeof drawerBodyRecipe

export type DrawerFooterRecipe = typeof drawerFooterRecipe
