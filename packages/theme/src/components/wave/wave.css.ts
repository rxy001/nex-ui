import { recipe } from '../../utils'

export const wave = recipe({
  base: {
    position: 'absolute',
    inset: '-1px',
    userSelect: 'none',
    pointerEvents: 'none',
  },
})
