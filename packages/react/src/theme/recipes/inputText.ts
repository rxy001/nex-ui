import { defineRecipe } from '@nex-ui/system'
import { colorVariant, radiusVariant } from './shared'

export const inputTextRecipe = defineRecipe({
  base: {
    outline: 'none',
    borderWidth: 'sm',
    borderStyle: 'solid',
    boxSizing: 'border-box',
  },
  variants: {
    size: {
      sm: {
        py: '0.5',
        px: '2',
        fs: 'sm',
        h: '6',
      },
      md: {
        py: '1',
        px: '3',
        h: '8',
        fs: 'md',
      },
      lg: {
        py: '1.5',
        px: '4',
        fs: 'lg',
        h: '10',
      },
    },
    radius: radiusVariant,
    color: colorVariant,
    variant: {
      outlined: {
        borderColor: 'colorPalette.outlined.fg',
      },
    },
  },
})
