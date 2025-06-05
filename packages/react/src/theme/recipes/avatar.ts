import { defineSlotRecipe, defineRecipe } from '@nex-ui/system'
import { toSlots, radiusVariant, colorVariant } from '../shared'
import type { RecipeVariants } from '@nex-ui/system'

export const avatarRecipe = defineSlotRecipe({
  slots: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'colorPalette.contrastText',
      bg: 'colorPalette.primary',
      overflow: 'hidden',
      userSelect: 'none',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          w: '8',
          h: '8',
          fs: 'md',
          '& svg': {
            fs: '1.5em',
          },
        },
      },
      md: {
        root: {
          w: '10',
          h: '10',
          fs: 'lg',
          '& svg': {
            fs: '1.6em',
          },
        },
      },
      lg: {
        root: {
          w: '12',
          h: '12',
          fs: 'xl',
          '& svg': {
            fs: '1.7em',
          },
        },
      },
      xl: {
        root: {
          w: '14',
          h: '14',
          fs: '2xl',
          '& svg': {
            fs: '1.8em',
          },
        },
      },
    },
    radius: {
      ...toSlots(radiusVariant, 'root'),
      xl: {
        root: {
          borderRadius: '2xl',
        },
      },
    },
    color: toSlots(colorVariant, 'root'),
    outlined: {
      true: {
        root: {
          boxShadow: '0 0 0 2px #fff,0 0 0 4px {colors.colorPalette.primary}',
        },
      },
    },
    inGroup: {
      true: {
        root: {
          ':not(:first-of-type)': {
            ml: 'var(--avatar-group-spacing, {spaces.-2})',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      inGroup: true,
      css: {
        root: {
          ':not(:first-of-type)': {
            ml: 'var(--avatar-group-spacing, {spaces.-1})',
          },
        },
      },
    },
    {
      size: 'lg',
      inGroup: true,
      css: {
        root: {
          ':not(:first-of-type)': {
            ml: 'var(--avatar-group-spacing, {spaces.-3})',
          },
        },
      },
    },
    {
      size: 'xl',
      inGroup: true,
      css: {
        root: {
          ':not(:first-of-type)': {
            ml: 'var(--avatar-group-spacing, {spaces.-4})',
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    radius: 'md',
    color: 'gray',
  },
})

export const avatarGroupRecipe = defineRecipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
})

export type AvatarRecipe = typeof avatarRecipe
export type AvatarVariants = RecipeVariants<AvatarRecipe>

export type AvatarGroupRecipe = typeof avatarGroupRecipe
