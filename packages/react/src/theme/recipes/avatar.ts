import { defineSlotRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'
import { toSlot, radiusVariant, colorVariant } from '../shared'

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
    },
    radius: toSlot(radiusVariant, 'root'),
    color: toSlot(colorVariant, 'root'),
    outlined: {
      true: {
        root: {
          outline: '2px solid {colors.colorPalette.primary}',
          outlineOffset: '0.5',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'md',
    color: 'gray',
  },
})

export type AvatarRecipe = typeof avatarRecipe
export type AvatarVariants = RecipeVariants<AvatarRecipe>
