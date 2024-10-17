import { keyframes } from '@emotion/react'
import { defineBaseStyles } from '@nex-ui/system'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const iconStyles = defineBaseStyles({
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
        fs: '1.25em',
      },
      md: {
        fs: '1.5em',
      },
      lg: {
        fs: '1.75em',
      },
    },
  },
})
