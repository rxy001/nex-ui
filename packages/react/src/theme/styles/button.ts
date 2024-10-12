import { defineSlotStyles } from '@nex-ui/system'

export const buttonStyles = defineSlotStyles({
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
      bg: 'white',
    },
    startIcon: {
      display: 'inherit',
      mr: '2',
      ml: '-1',
    },
    endIcon: {
      display: 'inherit',
      ml: '2',
      mr: '-1',
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
          bg: 'colorPalette.500',
          color: 'colorPalette.contrastText',
          _hover: {
            bg: 'colorPalette.400',
            color: 'colorPalette.contrastText',
          },
          _active: {
            bg: 'colorPalette.600',
            color: 'colorPalette.contrastText',
          },
        },
      },
      text: {
        root: {
          color: 'colorPalette.500',
          _hover: {
            bg: 'colorPalette.100',
          },
          _active: {
            bg: 'colorPalette.200',
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
        root: { px: '2', py: '0.5', fs: 'sm', h: '6' },
        startIcon: {
          ml: '-0.5',
          mr: '1.5',
        },
        endIcon: {
          mr: '-0.5',
          ml: '1.5',
        },
      },
      md: {
        root: { px: '3', py: '1', fs: 'md', h: '8' },
      },
      lg: {
        root: { px: '4', py: '1.5', fs: 'lg', h: '10' },
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
        root: { w: '100%' },
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
          p: '0.5',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        root: { w: '6' },
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        root: { w: '8' },
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        root: { w: '10' },
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
})
