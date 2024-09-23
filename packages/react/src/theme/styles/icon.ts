import { keyframes } from '@emotion/react'
import { defineStyles } from '@nex-ui/system'
import type {
  ExtractComponentStyles,
  ExtractComponentVariants,
} from '../utils.types'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const iconStyles = defineStyles({
  base: {
    userSelect: 'none',
    display: 'inline-block',
    flexShrink: 0,
  },
  variants: {
    spin: {
      true: {
        animation: `${circle} 2s linear infinite`,
      },
    },
    fontSize: {
      sm: {
        _fs: '1.25em',
      },
      md: {
        _fs: '1.5em',
      },
      lg: {
        _fs: '1.75em',
      },
    },
  },
})

export type IconVariants = ExtractComponentVariants<typeof iconStyles>

export type IconComponentStyles = ExtractComponentStyles<typeof iconStyles>
