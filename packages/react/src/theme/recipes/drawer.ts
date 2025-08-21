import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const drawerRootRecipe = defineSlotRecipe({
  slots: {
    root: {},
    backdrop: {},
  },
})

export const drawerContentRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
    },
    paper: {
      boxShadow: 'lg',
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
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: {},
    },
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
  },
  compoundVariants: [
    {
      placement: ['left', 'right'],
      size: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      css: {
        paper: {
          height: '100%',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      css: {
        paper: {
          width: '100%',
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'xs',
      css: {
        paper: {
          maxWidth: 300,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'sm',
      css: {
        paper: {
          maxWidth: 400,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'md',
      css: {
        paper: {
          maxWidth: 500,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'lg',
      css: {
        paper: {
          maxWidth: 600,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'xl',
      css: {
        paper: {
          maxWidth: 700,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xs',
      css: {
        paper: {
          maxHeight: 300,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'sm',
      css: {
        paper: {
          maxHeight: 400,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'md',
      css: {
        paper: {
          maxHeight: 500,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'lg',
      css: {
        paper: {
          maxHeight: 600,
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'xl',
      css: {
        paper: {
          maxHeight: 700,
        },
      },
    },
    {
      placement: ['left', 'right'],
      size: 'full',
      css: {
        paper: {
          maxWidth: '100vw',
        },
      },
    },
    {
      placement: ['top', 'bottom'],
      size: 'full',
      css: {
        paper: {
          maxHeight: '100vh',
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

export type DrawerRootRecipe = typeof drawerRootRecipe

export type DrawerContentRecipe = typeof drawerContentRecipe
export type DrawerContentVariants = RecipeVariants<DrawerContentRecipe>

export type DrawerHeaderRecipe = typeof drawerHeaderRecipe

export type DrawerBodyRecipe = typeof drawerBodyRecipe

export type DrawerFooterRecipe = typeof drawerFooterRecipe
