import { defineRecipe } from '@nex-ui/system'

export const modalRootRecipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: 'modal',
  },
})

export const modalContentRecipe = defineRecipe({
  base: {
    width: 'full',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    bg: {
      _DEFAULT: 'white',
      _dark: '#18181b',
    },
  },
})

export const modalHeaderRecipe = defineRecipe({
  base: {
    w: 'full',
    m: 0,
    boxSizing: 'border-box',
  },
})

export const modalBodyRecipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    height: '100%',
    wordBreak: 'break-word',
  },
})

export const modalFooterRecipe = defineRecipe({
  base: {
    w: 'full',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5',
  },
})

export const modalBackdropRecipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    bg: 'black/50',
  },
})

export const modalPanelRecipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
  },
})
