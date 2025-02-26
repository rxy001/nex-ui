import { describe, it, expect } from '@jest/globals'
import { defineRecipe } from '../recipes'
import { createSystem } from '../system'
import { defineConfig } from '../defineConfig'

const SELECTOR_HORVER = '&:not(:disabled):not([data-disabled=true]):hover'
const CSS_VARS_PREFIX = 'test'

const sysConfig = defineConfig({
  cssVarsPrefix: CSS_VARS_PREFIX,
  aliases: {
    w: 'width',
    h: 'height',
    px: ['paddingLeft', 'paddingRight'],
    fs: 'fontSize',
    fw: 'fontWeight',
    lh: 'lineHeight',
  },
  breakpoints: { sm: '500px', md: '700px', lg: '900px' },
  tokens: {
    colors: {
      white: '#f1f1f1',
      blue: {
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#a3cfff',
      },
    },
    borders: { xs: '0.5px', sm: '1px' },
    radii: { sm: '4px', md: '6px', lg: '8px' },
    sizes: {
      1: '32px',
      2: '40px',
      3: '48px',
    },
    spaces: {
      1: '4px',
      2: '8px',
      3: '12px',
    },
    fontSizes: {
      sm: '12px',
      md: '14px',
      lg: '16px',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeights: {
      short: 1.375,
      base: 1.5,
      tall: 1.625,
    },
  },
  scales: {
    color: 'colors',
    borderColor: 'colors',
    backgroundColor: 'colors',

    fontSize: 'fontSizes',
    borderWidth: 'borders',

    width: 'sizes',
    height: 'sizes',

    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    fontFamily: 'fontFamilies',

    gap: 'spaces',

    padding: 'spaces',
    paddingTop: 'spaces',
    paddingBottom: 'spaces',
    paddingLeft: 'spaces',
    paddingRight: 'spaces',

    marginRight: 'spaces',
    marginTop: 'spaces',
    marginLeft: 'spaces',
    marginBottom: 'spaces',
    margin: 'spaces',

    borderRadius: 'radii',
    borderTopRightRadius: 'radii',
    borderTopLeftRadius: 'radii',
    borderBottomRightRadius: 'radii',
    borderBottomLeftRadius: 'radii',
  },
  selectors: {
    hover: SELECTOR_HORVER,
  },
})

describe('base styles', () => {
  const base = {
    px: '1',
    color: 'white',
    borderWidth: 'sm',
    borderRadius: 'sm',
    backgroundColor: 'colorPalette',
    colorPalette: 'blue.100',
    _hover: {
      color: 'yellow',
    },
  }

  const variants = {
    size: {
      sm: { w: '1', h: '1' },
      md: { w: '2', h: '2' },
    },
    color: {
      red: {
        color: 'red',
      },
      blue: {
        color: 'blue',
      },
    },
  }

  const baseStyles = defineRecipe({
    base,
    variants,
    compoundVariants: [
      {
        size: ['sm', 'md'],
        color: 'red',
        css: {
          background: 'red',
        },
      },
    ],
  })

  const { css } = createSystem(sysConfig)

  it('should defineRecipe work correctly', () => {
    expect(baseStyles()).toEqual(base)

    expect(
      baseStyles({
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
    })

    expect(
      baseStyles({
        size: 'sm',
        color: 'blue',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.blue,
    })

    expect(
      baseStyles({
        size: 'sm',
        color: 'red',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.red,
      background: 'red',
    })

    expect(
      baseStyles({
        size: 'md',
        color: 'red',
      }),
    ).toEqual({
      ...base,
      ...variants.size.md,
      ...variants.color.red,
      background: 'red',
    })
  })

  it('should css work correctly', () => {
    const toCssVariable = (v: string) => `var(--${CSS_VARS_PREFIX}-${v})`

    const transformedBase = {
      paddingLeft: toCssVariable('spaces-1'),
      paddingRight: toCssVariable('spaces-1'),
      color: toCssVariable('colors-white'),
      backgroundColor: toCssVariable('colors-blue-100'),
      borderWidth: toCssVariable('borders-sm'),
      borderRadius: toCssVariable('radii-sm'),
      [SELECTOR_HORVER]: {
        color: 'yellow',
      },
    }

    const transformedVariants = {
      size: {
        sm: {
          width: toCssVariable('sizes-1'),
          height: toCssVariable('sizes-1'),
        },
        md: {
          width: toCssVariable('sizes-2'),
          height: toCssVariable('sizes-2'),
        },
      },
      color: {
        red: {
          color: 'red',
        },
        blue: {
          color: 'blue',
        },
      },
    }

    expect(css(baseStyles())).toEqual(transformedBase)
    expect(
      css(
        baseStyles({
          size: 'sm',
        }),
      ),
    ).toEqual({
      ...transformedBase,
      ...transformedVariants.size.sm,
    })

    expect(
      css(
        baseStyles({
          size: 'sm',
          color: 'blue',
        }),
      ),
    ).toEqual({
      ...transformedBase,
      ...transformedVariants.size.sm,
      ...transformedVariants.color.blue,
    })

    expect(
      css(
        baseStyles({
          size: 'sm',
          color: 'red',
        }),
      ),
    ).toEqual({
      ...transformedBase,
      ...transformedVariants.size.sm,
      ...transformedVariants.color.red,
      background: 'red',
    })

    expect(
      css(
        baseStyles({
          size: 'md',
          color: 'red',
        }),
      ),
    ).toEqual({
      ...transformedBase,
      ...transformedVariants.size.md,
      ...transformedVariants.color.red,
      background: 'red',
    })
  })
})
