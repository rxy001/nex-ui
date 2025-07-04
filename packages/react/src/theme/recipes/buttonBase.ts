import { defineRecipe } from '@nex-ui/system'

export const buttonBaseRecipes = defineRecipe({
  base: {
    bg: 'transparent',
    p: 0,
    border: 'none',
    outline: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
