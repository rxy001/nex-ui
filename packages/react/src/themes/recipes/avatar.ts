import { defineSlotRecipe, defineRecipe } from '@nex-ui/system'
import { toSlots, radiusVariant, colorVariant } from './shared'
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
      w: 'full',
      h: 'full',
      objectFit: 'cover',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          w: '8',
          h: '8',
          fs: 'sm',
          '& svg': {
            fs: '1.5em',
          },
        },
      },
      md: {
        root: {
          w: '10',
          h: '10',
          fs: 'md',
          '& svg': {
            fs: '1.6em',
          },
        },
      },
      lg: {
        root: {
          w: '12',
          h: '12',
          fs: 'lg',
          '& svg': {
            fs: '1.7em',
          },
        },
      },
    },
    radius: toSlots(radiusVariant, 'root'),
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
          pos: 'relative',
          zIndex: 1,
          ':not(:first-of-type)': {
            ml: 'var(--avatar-group-spacing, {spaces.-2})',
          },
          ':not(:last-of-type)': {
            _hover: {
              transform:
                'translateX(min(0px, var(--avatar-group-spacing, {spaces.-2})))',
            },
          },
        },
      },
    },
    disableAnimation: {
      false: {},
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
      disableAnimation: false,
      inGroup: true,
      css: {
        root: {
          transition: 'transform',
        },
      },
    },
  ],
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
