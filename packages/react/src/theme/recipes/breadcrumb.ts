import { defineSlotRecipe } from '@nex-ui/system'
import { colorVariant, toSlots } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const breadcrumbRecipe = defineSlotRecipe({
  slots: {
    root: {},
    list: {
      display: 'flex',
      alignItems: 'center',
      wordBreak: 'break-word',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    separator: {
      mx: 'var(--breadcrumb-separator-gap, {spaces.2})',
      cursor: 'default',
      color: 'colorPalette.primary/75',
    },
    collapse: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'colorPalette.primary/75',
      cursor: 'pointer',
      transition: 'colors',
      _hover: {
        opacity: 0.6,
      },
      _active: {
        opacity: 0.95,
      },
    },
  },
  variants: {
    size: {
      sm: {
        separator: {
          fs: 'sm',
        },
      },
      md: {
        separator: {
          fs: 'md',
        },
      },
      lg: {
        separator: {
          fs: 'lg',
        },
      },
    },
    color: {
      ...toSlots(colorVariant, 'separator', 'collapse'),
      default: {
        separator: {
          color: 'text/50',
        },
        collapse: {
          color: 'text/50',
        },
      },
    },
  },
})

export const breadcrumbItemRecipe = defineSlotRecipe({
  slots: {
    root: {},
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      gap: '1',
      color: 'colorPalette.primary/75',
      userSelect: 'none',
      transition: 'colors',
    },
  },
  variants: {
    isLast: {
      true: {
        link: {
          cursor: 'default',
          color: 'colorPalette.primary',
        },
      },
      false: {
        link: {
          _hover: {
            opacity: 0.6,
          },
          _active: {
            opacity: 0.95,
          },
        },
      },
    },
    color: {
      ...toSlots(colorVariant, 'link'),
      default: {
        link: {
          color: 'text/50',
        },
      },
    },
    size: {
      sm: {
        link: {
          fs: 'sm',
        },
      },
      md: {
        link: {
          fs: 'md',
        },
      },
      lg: {
        link: {
          fs: 'lg',
        },
      },
    },
  },
  compoundVariants: [
    {
      color: 'default',
      isLast: true,
      css: {
        link: {
          color: 'text',
        },
      },
    },
  ],
})

export type BreadcrumbRecipe = typeof breadcrumbRecipe
export type BreadcrumbItemRecipe = typeof breadcrumbItemRecipe

export type BreadcrumbVariants = RecipeVariants<BreadcrumbRecipe>
export type BreadcrumbItemVariants = RecipeVariants<BreadcrumbItemRecipe>
