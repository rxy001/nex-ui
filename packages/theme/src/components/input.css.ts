import { createTheme } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { createThemeContract } from '../utils'

const typeVars = createThemeContract([
  'borderColor',
  'backgroundColor',
  'color',
] as const)

const sizeVars = createThemeContract(['paddingX', 'paddingY'] as const)

export const input = recipe({
  base: {
    outline: 'none',
    userSelect: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    ...typeVars,
    padding: `${sizeVars.paddingY} ${sizeVars.paddingX}`,
  },
  variants: {
    type: {
      default: createTheme(typeVars, {
        backgroundColor: '#fff',
        borderColor: 'black',
        color: 'black',
      }),
      primary: createTheme(typeVars, {
        backgroundColor: '#1677ff',
        borderColor: '#69b1ff',
        color: '#fff',
      }),
    },
    size: {
      medium: createTheme(sizeVars, {
        paddingX: '15px',
        paddingY: '4px',
      }),
      large: createTheme(sizeVars, {
        paddingX: '15px',
        paddingY: '7px',
      }),
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'medium',
  },
})

export type InputVariants = RecipeVariants<typeof input>
