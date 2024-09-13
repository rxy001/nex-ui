import { defineStyles } from '@nex-ui/system'
import type { ExtractComponentType, ExtractVariants } from '../types'

export const button = defineStyles({
  slots: {
    root: {
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
      _bg: 'white',
    },
    startIcon: {
      display: 'inherit',
      _mr: '2',
      _ml: '-1',
    },
    endIcon: {
      display: 'inherit',
      _ml: '2',
      _mr: '-1',
    },
  },
  variants: {
    variant: {
      outline: {
        root: {
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
      },
      solid: {
        root: {
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
      },
      text: {
        root: {
          color: 'colorPalette.500',
          _hover: {
            _bg: 'colorPalette.100',
          },
          _active: {
            _bg: 'colorPalette.200',
          },
        },
      },
      link: {
        root: {
          color: 'colorPalette.500',
          _hover: {
            color: 'colorPalette.400',
          },
          _active: {
            color: 'colorPalette.600',
          },
        },
      },
    },
    size: {
      sm: {
        root: { _px: '2', _py: '0.5', _fs: 'sm', _h: '6' },
        startIcon: {
          _ml: '-0.5',
          _mr: '1.5',
        },
        endIcon: {
          _mr: '-0.5',
          _ml: '1.5',
        },
      },
      md: {
        root: { _px: '3', _py: '1', _fs: 'md', _h: '8' },
      },
      lg: {
        root: { _px: '4', _py: '1.5', _fs: 'lg', _h: '10' },
      },
    },
    disabled: {
      true: {
        root: {
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.6,
            '& a': {
              pointerEvents: 'none',
            },
          },
        },
      },
    },
    loading: {
      true: {
        root: {
          _disabled: {
            cursor: 'not-allowed',
            opacity: 0.6,
            '& a': {
              pointerEvents: 'none',
            },
          },
        },
      },
    },
    block: {
      true: {
        root: { _w: '100%' },
      },
    },
    radius: {
      sm: {
        root: { borderRadius: 'sm' },
      },
      md: {
        root: { borderRadius: 'md' },
      },
      lg: {
        root: { borderRadius: 'lg' },
      },
      full: {
        root: { borderRadius: '9999px' },
      },
    },
    iconOnly: {
      true: {
        root: {
          borderRadius: '50%',
          _p: '0.5',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        root: { _w: '6' },
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        root: { _w: '8' },
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        root: { _w: '10' },
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
})

export type ButtonVariants = ExtractVariants<typeof button>

export type ButtonComponentStyles = ExtractComponentType<typeof button>
