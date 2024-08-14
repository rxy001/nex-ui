import { defineStyles, keyframes } from '@nex-ui/system'
import type { ExtractComponentType, ExtractVariants } from '../types'

export const button = defineStyles({
  base: {
    outline: 'none',
    userSelect: 'none',
    borderWidth: 'sm',
    borderStyle: 'solid',
    cursor: 'pointer',
    position: 'relative',
    transition: '.3s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    lineHeight: 'base',
    borderColor: 'transparent',
    fontFamily: 'body',
    '& svg': {
      _fs: '1.25em',
    },
    '& a': {
      pointerEvents: 'none',
    },
  },
  variants: {
    variant: {
      outline: {
        borderColor: 'colorPalette.500',
        color: 'colorPalette.500',
        _hover: {
          borderColor: 'colorPalette.400',
          color: 'colorPalette.400',
        },
        _active: {
          borderColor: 'colorPalette.600',
          color: 'colorPalette.600',
        },
      },
      solid: {
        _bg: 'colorPalette.500',
        color: 'colorPalette.contrastText',
        _hover: {
          _bg: 'colorPalette.400',
          color: 'colorPalette.contrastText',
        },
        _active: {
          _bg: 'colorPalette.600',
          color: 'colorPalette.contrastText',
        },
      },
      text: {
        color: 'colorPalette.500',
        _hover: {
          _bg: 'colorPalette.100',
        },
        _active: {
          _bg: 'colorPalette.200',
        },
      },
      link: {
        color: 'colorPalette.500',
        _hover: {
          color: 'colorPalette.400',
        },
        _active: {
          color: 'colorPalette.600',
        },
      },
    },
    size: {
      sm: {
        _px: '2',
        _py: '0.5',
        _fs: 'sm',
      },
      md: {
        _px: '3',
        _py: '1',
        _fs: 'md',
      },
      lg: {
        _px: '4',
        _py: '1.5',
        _fs: 'lg',
      },
    },
    disabled: {
      true: {
        _disabled: {
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },
    },
    block: {
      true: {
        _w: '100%',
      },
    },
    radius: {
      sm: {
        borderRadius: 'sm',
      },
      md: {
        borderRadius: 'md',
      },
      lg: {
        borderRadius: 'lg',
      },
      full: {
        borderRadius: '9999px',
      },
    },
    loading: {
      true: {
        cursor: 'default',
        opacity: 0.65,
      },
    },
    iconOnly: {
      true: {
        borderRadius: '50%',
        '& svg': {
          _fs: '1.5em',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        _p: '0.5',
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        _p: '1',
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        _p: '1.5',
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
})

const loadingCircle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const buttonStartIcon = defineStyles({
  base: {
    display: 'inherit',
    _mr: '2',
    _ml: '-1',
  },
  variants: {
    size: {
      sm: {
        _ml: '-0.5',
        _mr: '1.5',
      },
    },
    spin: {
      true: {
        animation: `${loadingCircle} 1s infinite linear`,
      },
    },
  },
})

export const buttonEndIcon = defineStyles({
  base: {
    display: 'inherit',
    _ml: '2',
    _mr: '-1',
  },
  variants: {
    size: {
      sm: {
        _mr: '-0.5',
        _ml: '1.5',
      },
    },
  },
})

export type ButtonVariants = ExtractVariants<typeof button>

export type ButtonComponentStyles = ExtractComponentType<typeof button>
