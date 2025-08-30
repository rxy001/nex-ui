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
    w: '100%',
  },
} as const

export const radiusVariant = {
  sm: {
    borderRadius: 'md',
  },
  md: {
    borderRadius: 'lg',
  },
  lg: {
    borderRadius: 'xl',
  },
  full: {
    borderRadius: 'full',
  },
  none: {
    borderRadius: 'none',
  },
} as const

export const sizeVariant = {
  sm: {
    px: '3',
    fs: 'md',
    h: '8',
  },
  md: {
    px: '4',
    fs: 'lg',
    h: '10',
  },
  lg: {
    px: '5',
    fs: 'xl',
    h: '12',
  },
} as const

export const disabledVariant = {
  true: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
} as const
