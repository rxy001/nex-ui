import { defineSlotRecipe } from '@nex-ui/system'

export const buttonRecipe = defineSlotRecipe({
  slots: {
    root: {
      outline: 'none',
      userSelect: 'none',
      borderWidth: 'sm',
      borderStyle: 'filled',
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
      bg: 'transparent',
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
      outlined: {
        root: {
          borderColor: 'colorPalette.outlined.fg',
          color: 'colorPalette.outlined.fg',
          _hover: {
            borderColor: 'colorPalette.outlined.hover',
            color: 'colorPalette.outlined.hover',
          },
          _active: {
            borderColor: 'colorPalette.outlined.active',
            color: 'colorPalette.outlined.active',
          },
        },
      },
      filled: {
        root: {
          bg: 'colorPalette.filled.fg',
          color: 'colorPalette.filled.contrastText',
          _hover: {
            bg: 'colorPalette.filled.hover',
            color: 'colorPalette.filled.contrastText',
          },
          _active: {
            bg: 'colorPalette.filled.active',
            color: 'colorPalette.filled.contrastText',
          },
        },
      },
      text: {
        root: {
          color: 'colorPalette.text.fg',
          _hover: {
            bg: 'colorPalette.text.hover',
          },
          _active: {
            bg: 'colorPalette.text.active',
          },
        },
      },
      link: {
        root: {
          color: 'colorPalette.link.fg',
          _hover: {
            color: 'colorPalette.link.hover',
          },
          _active: {
            color: 'colorPalette.link.active',
          },
        },
      },
    },
    size: {
      sm: {
        root: { px: '2', py: '0.5', fs: 'sm', h: '6' },
        startIcon: {
          ml: '-0.5',
          mr: '1',
        },
        endIcon: {
          mr: '-0.5',
          ml: '1',
        },
      },
      md: {
        root: {
          px: '3',
          py: '1',
          fs: 'md',
          h: '8',
          '& svg': {
            fs: '1.3em',
          },
        },
      },
      lg: {
        root: {
          px: '4',
          py: '1.5',
          fs: 'lg',
          h: '10',
          '& svg': {
            fs: '1.5em',
          },
        },
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
    fullWidth: {
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
    color: {
      blue: {
        root: {
          colorPalette: 'blue',
        },
      },
      gray: {
        root: {
          colorPalette: 'gray',
        },
      },
      pink: {
        root: {
          colorPalette: 'pink',
        },
      },
      purple: {
        root: {
          colorPalette: 'purple',
        },
      },
      cyan: {
        root: {
          colorPalette: 'cyan',
        },
      },
      orange: {
        root: {
          colorPalette: 'orange',
        },
      },
      yellow: {
        root: {
          colorPalette: 'yellow',
        },
      },
      green: {
        root: {
          colorPalette: 'green',
        },
      },
      red: {
        root: {
          colorPalette: 'red',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      iconOnly: true,
      css: {
        root: {
          w: '6',
        },
      },
    },
    {
      size: 'md',
      iconOnly: true,
      css: {
        root: {
          w: '8',
        },
      },
    },
    {
      size: 'lg',
      iconOnly: true,
      css: {
        root: {
          w: '10',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'md',
    radius: 'md',
  },
})
