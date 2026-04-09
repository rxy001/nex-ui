export const colorVariant = {
  blue: {
    colorPalette: 'blue',
  },
  gray: {
    colorPalette: 'gray',
  },
  pink: {
    colorPalette: 'pink',
  },
  purple: {
    colorPalette: 'purple',
  },
  cyan: {
    colorPalette: 'cyan',
  },
  orange: {
    colorPalette: 'orange',
  },
  yellow: {
    colorPalette: 'yellow',
  },
  green: {
    colorPalette: 'green',
  },
  red: {
    colorPalette: 'red',
  },
} as const

export const fullWidth = {
  true: {
    w: 'full',
  },
} as const

export const radiusVariant = {
  sm: {
    borderRadius: 'lg',
  },
  md: {
    borderRadius: 'xl',
  },
  lg: {
    borderRadius: '2xl',
  },
  full: {
    borderRadius: 'full',
  },
  none: {
    borderRadius: 'none',
  },
} as const

export const disabledVariant = {
  true: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
} as const
