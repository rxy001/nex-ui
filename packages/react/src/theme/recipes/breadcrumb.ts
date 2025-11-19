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
      lh: 'short',
    },
    separator: {
      mx: 'var(--breadcrumb-separator-gap, {spaces.2})',
      cursor: 'default',
      color: 'colorPalette.primary/70',
    },
    collapse: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    expandButton: {
      display: 'inline-flex',
      alignItems: 'center',
      fs: 'lg',
      borderRadius: 2,
      cursor: 'pointer',
      transition: 'colors',
      color: {
        _DEFAULT: 'colorPalette.primary/70',
        _hover: {
          _DEFAULT: 'colorPalette.primary/50',
          _dark: 'colorPalette.primary/90',
        },
        _active: {
          _DEFAULT: 'colorPalette.primary/80',
          _dark: 'colorPalette.primary/60',
        },
      },
      _focusVisibleRing: {
        outline: '{borders.md} {colors.colorPalette.primary}',
        outlineOffset: '2px',
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
      ...toSlots(colorVariant, 'separator', 'expandButton'),
      default: {
        separator: {
          color: 'text/50',
        },
        expandButton: {
          color: {
            _DEFAULT: 'text/50',
            _hover: {
              _DEFAULT: 'text/30',
              _dark: 'text/70',
            },
            _active: {
              _DEFAULT: 'text/60',
              _dark: 'text/40',
            },
          },
          _focusVisibleRing: {
            outline: '{borders.md} {colors.text}',
          },
        },
      },
    },
  },
})

export const breadcrumbItemRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      gap: '1',
      color: 'colorPalette.primary/70',
      userSelect: 'none',
      transition: 'colors',
      borderRadius: 2,
      _focusVisibleRing: {
        outline: '{borders.md} {colors.colorPalette.primary}',
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    isLast: {
      true: {
        link: {
          cursor: 'default',
          color: {
            _DEFAULT: 'colorPalette.primary',
          },
        },
      },
      false: {
        link: {
          color: {
            _DEFAULT: 'colorPalette.primary/70',
            _hover: {
              _DEFAULT: 'colorPalette.primary/50',
              _dark: 'colorPalette.primary/90',
            },
            _active: {
              _DEFAULT: 'colorPalette.primary/80',
              _dark: 'colorPalette.primary/60',
            },
          },
        },
      },
    },
    color: {
      ...toSlots(colorVariant, 'link'),
      default: {
        link: {
          color: {
            _DEFAULT: 'text/50',
            _hover: {
              _DEFAULT: 'text/30',
              _dark: 'text/70',
            },
            _active: {
              _DEFAULT: 'text/60',
              _dark: 'text/40',
            },
          },
          _focusVisibleRing: {
            outline: '{borders.md} {colors.text}',
          },
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
