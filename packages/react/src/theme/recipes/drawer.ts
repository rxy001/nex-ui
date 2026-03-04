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
    backdrop: {
      zIndex: 'drawer',
    },
  },
  variants: {
    placement: {
      left: {
        root: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        paper: {
          borderTopRightRadius: 'lg',
          borderBottomRightRadius: 'lg',
        },
      },
      right: {
        root: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        paper: {
          borderTopLeftRadius: 'lg',
          borderBottomLeftRadius: 'lg',
        },
      },
      top: {
        root: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
        paper: {
          borderBottomLeftRadius: 'lg',
          borderBottomRightRadius: 'lg',
        },
      },
      bottom: {
        root: {
          flexDirection: 'column',
          justifyContent: 'flex-end',
        },
        paper: {
          borderTopLeftRadius: 'lg',
          borderTopRightRadius: 'lg',
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
  },
  compoundVariants: [
    {
      placement: ['left', 'right'],
      size: 'xs',
      css: {
        paper: {
          w: 300,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'sm',
      css: {
        paper: {
          w: 400,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'md',
      css: {
        paper: {
          w: 500,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'lg',
      css: {
        paper: {
          w: 600,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'xl',
      css: {
        paper: {
          w: 700,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xs',
      css: {
        paper: {
          h: 300,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'sm',
      css: {
        paper: {
          h: 400,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'md',
      css: {
        paper: {
          h: 500,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'lg',
      css: {
        paper: {
          h: 600,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xl',
      css: {
        paper: {
          h: 700,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'full',
      css: {
        paper: {
          h: '100vw',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'full',
      css: {
        paper: {
          h: '100vh',
        },
      },
    },
  ],
})

export const drawerHeaderRecipe = defineRecipe({
  base: {
    py: '4',
    px: '6',
    fontWeight: 500,
    fs: 'xl',
    lineHeight: '1.5556',
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
