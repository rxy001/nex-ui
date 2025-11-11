import { keyframes } from '@emotion/react'
import { createSystem } from '../index'
import { defineConfig } from '../defineConfig'
import { toMediaKey } from '../breakpoints'
import type { SerializedStyles, ComponentSelector } from '@emotion/react'

const SELECTOR_HOVER = '&:not(:disabled):not([data-disabled=true]):hover'
const SELECTOR_ACTIVE = '&:not(:disabled):not([data-disabled=true]):active'
const SELECTOR_DARK = '[data-nui-color-scheme="dark"] &'
const SELECTOR_LIGHT = '[data-nui-color-scheme="light"] &'
const PREFIX = 'test'

describe('createSystem', () => {
  it('should call with default config', () => {
    const system = createSystem({ prefix: PREFIX })
    expect(system).toBeDefined()
  })
})

describe('css', () => {
  const sysConfig = defineConfig({
    cssCascadeLayersDisabled: false,
    prefix: PREFIX,
    aliases: {
      w: 'width',
      h: 'height',
      px: ['paddingLeft', 'paddingRight'],
      fs: 'fontSize',
      fw: 'fontWeight',
      lh: 'lineHeight',
      bg: 'backgroundColor',
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
        red: {
          '100': '#fca5a5',
        },
      },
      borders: { sm: '1px solid' },
      radii: { sm: '4px', md: '6px', lg: '8px' },
      sizes: {
        1: '32px',
        '1.5': '36px',
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
      fontFamilies: {
        body: 'system',
      },
      zIndices: {
        min: 1,
      },
      transitions: {
        all: 'all 0.2s',
      },
      shadows: {
        sm: 'shadow',
      },
      borderWidths: {
        sm: '1px',
      },
    },
    scales: {
      color: 'colors',
      borderColor: 'colors',
      backgroundColor: 'colors',
      fontSize: 'fontSizes',
      borderWidth: 'borderWidths',
      width: 'sizes',
      height: 'sizes',
      fontWeight: 'fontWeights',
      lineHeight: 'lineHeights',
      fontFamily: 'fontFamilies',
      padding: 'spaces',
      margin: 'spaces',
      paddingLeft: 'spaces',
      paddingRight: 'spaces',
      borderRadius: 'radii',
      border: 'borders',
      zIndex: 'zIndices',
      transition: 'transitions',
      boxShadow: 'shadows',
    },
    selectors: {
      hover: SELECTOR_HOVER,
      active: SELECTOR_ACTIVE,
      dark: SELECTOR_DARK,
      light: SELECTOR_LIGHT,
    },
    semanticTokens: {
      colors: {
        primary: {
          _DEFAULT: '{colors.blue.100}',
          _dark: '{colors.blue.300}',
        },
        secondary: '{colors.blue.200}',
      },
    },
  })

  const { css, getGlobalCssVars, getToken, layers } = createSystem(sysConfig)

  const getCssVar = (token: string) => getToken(token)?.value

  it('should convert only string values into tokens', () => {
    expect(
      css({
        width: 1,
      }),
    ).toEqual({
      width: 1,
    })

    expect(
      css({
        width: '1',
        height: '1.5',
      }),
    ).toEqual({
      width: getCssVar('sizes.1'),
      height: getCssVar('sizes.1.5'),
    })
  })

  it('should support cascade layers', () => {
    expect(layers.atRules).toBe(`@layer ${PREFIX}.global, ${PREFIX}.css;`)

    const objectStyle = {
      color: 'red',
    }

    expect(layers.wrapWithLayer('global', objectStyle)).toEqual({
      [`@layer ${PREFIX}.global`]: objectStyle,
    })

    const arrayStyle = [
      {
        color: 'red',
      },
    ]

    expect(layers.wrapWithLayer('css', arrayStyle)).toEqual({
      [`@layer ${PREFIX}.css`]: arrayStyle,
    })

    expect(layers.wrapWithLayer('css', null)).toEqual(null)
    expect(layers.wrapWithLayer('css', [])).toEqual([])
    expect(layers.wrapWithLayer('css', {})).toEqual({})
    expect(layers.wrapWithLayer('css', '')).toEqual('')
    expect(layers.wrapWithLayer('css', 1)).toEqual(1)
  })

  it('should convert tokens into corresponding CSS variables', () => {
    const styles = {
      width: '1',
      height: '2',
      padding: '1',
      borderWidth: 'sm',
      color: 'white',
      borderColor: 'blue.100',
      borderRadius: 'sm',
      fontSize: 'sm',
      fontWeight: 'medium',
      lineHeight: 'base',
      fontFamily: 'body',
      zIndex: 'min',
      transition: 'all',
      boxShadow: 'sm',
      margin: '1',
      backgroundColor: 'primary',
    }

    expect(css(styles)).toEqual({
      width: getCssVar('sizes.1'),
      height: getCssVar('sizes.2'),
      padding: getCssVar('spaces.1'),
      borderWidth: getCssVar('borderWidths.sm'),
      color: getCssVar('colors.white'),
      borderColor: getCssVar('colors.blue.100'),
      borderRadius: getCssVar('radii.sm'),
      fontSize: getCssVar('fontSizes.sm'),
      fontWeight: getCssVar('fontWeights.medium'),
      lineHeight: getCssVar('lineHeights.base'),
      fontFamily: getCssVar('fontFamilies.body'),
      zIndex: getCssVar('zIndices.min'),
      transition: getCssVar('transitions.all'),
      boxShadow: getCssVar('shadows.sm'),
      margin: getCssVar('spaces.1'),
      backgroundColor: getCssVar('colors.primary'),
    })

    expect(css(styles)).toMatchSnapshot()
    expect(getGlobalCssVars()).toMatchSnapshot()
  })

  it('should convert aliases into corresponding CSS properties', () => {
    const styles = {
      w: '1',
      px: '1',
    }

    expect(css(styles)).toEqual({
      width: getCssVar('sizes.1'),
      paddingLeft: getCssVar('spaces.1'),
      paddingRight: getCssVar('spaces.1'),
    })
  })

  it('should support custom selectors', () => {
    expect(
      css({
        _hover: {
          color: 'white',
        },
      }),
    ).toEqual({
      [SELECTOR_HOVER]: {
        color: getCssVar('colors.white'),
      },
    })

    expect(
      css({
        color: {
          // @ts-ignore
          _hover: 'white',
        },
      }),
    ).toEqual({
      [SELECTOR_HOVER]: {
        color: getCssVar('colors.white'),
      },
    })
  })

  it('should support color placeholder', () => {
    expect(
      css({
        colorPalette: 'blue',
        backgroundColor: {
          _DEFAULT: 'colorPalette.100',
          // @ts-ignore
          _hover: 'colorPalette.200',
        },
        color: 'colorPalette.100',
      }),
    ).toEqual({
      color: getCssVar('colors.blue.100'),
      backgroundColor: getCssVar('colors.blue.100'),
      [SELECTOR_HOVER]: {
        backgroundColor: getCssVar('colors.blue.200'),
      },
    })

    expect(
      css({
        color: 'colorPalette.100',
        colorPalette: 'red',
        _hover: {
          color: 'colorPalette.200',
          colorPalette: 'blue',
        },
      }),
    ).toEqual({
      color: getCssVar('colors.red.100'),
      [SELECTOR_HOVER]: {
        color: getCssVar('colors.blue.200'),
      },
    })
  })

  it('should throw an error if color placeholder is used without providing the colorPalette prop', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    css({
      color: 'colorPalette.100',
    })
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('should support responsive value (object)', () => {
    expect(
      css({
        width: {
          // @ts-ignore
          _sm: '1',
          _md: '2',
        },
      }),
    ).toEqual({
      [toMediaKey('500px')]: {
        width: getCssVar('sizes.1'),
      },
      [toMediaKey('700px')]: {
        width: getCssVar('sizes.2'),
      },
    })

    expect(
      css({
        width: {
          // @ts-ignore
          _xl: '2',
        },
      }),
    ).toEqual({
      _xl: {
        width: getCssVar('sizes.2'),
      },
    })
  })

  it('should support responsive value (array)', () => {
    expect(
      // @ts-ignore
      css({
        width: ['1', '1.5', '2', '3'],
      }),
    ).toEqual({
      [toMediaKey('500px')]: {
        width: getCssVar('sizes.1'),
      },
      [toMediaKey('700px')]: {
        width: getCssVar('sizes.1.5'),
      },
      [toMediaKey('900px')]: {
        width: getCssVar('sizes.2'),
      },
      width: getCssVar('sizes.3'),
    })
  })

  it('should support token reference syntax', () => {
    expect(
      css({
        border: '1px solid {colors.blue.100}',
      }),
    ).toEqual({
      border: `1px solid ${getCssVar('colors.blue.100')}`,
    })

    expect(
      css({
        border: '1px solid {colors.colorPalette.100}',
        colorPalette: 'blue',
      }),
    ).toEqual({
      border: `1px solid ${getCssVar('colors.blue.100')}`,
    })

    expect(
      css({
        border: '1px solid {color.red.100}',
      }),
    ).toEqual({
      border: '1px solid {color.red.100}',
    })
  })

  it('should use color placeholder in the token reference syntax', () => {
    expect(
      css({
        colorPalette: 'blue',
        border: '1px solid {colors.colorPalette.100}',
      }),
    ).toEqual({
      border: `1px solid ${getCssVar('colors.blue.100')}`,
    })
  })

  it('should throw an error if an invalid token is used in the token reference syntax', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    css({
      border: '1px solid {colors.pink.100}',
    })
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('should support color opacity modifier', () => {
    const colorMix = (color: string, opacity: number | string) =>
      `color-mix(in oklab, ${color} ${opacity}%, transparent)`

    expect(
      css({
        color: 'blue.100/50',
        backgroundColor: 'blue.200/80',
        borderColor: 'orange/30',
      }),
    ).toEqual({
      color: colorMix(getCssVar('colors.blue.100')!, 50),
      backgroundColor: colorMix(getCssVar('colors.blue.200')!, 80),
      borderColor: colorMix('orange', 30),
    })

    expect(
      css({
        border: '1px solid {colors.colorPalette.100/50}',
        borderColor: 'colorPalette.200/90',
        colorPalette: 'blue',
      }),
    ).toEqual({
      border: `1px solid ${colorMix(getCssVar('colors.blue.100')!, 50)}`,
      borderColor: colorMix(getCssVar('colors.blue.200')!, 90),
    })

    expect(
      css({
        color: 'var(--my-color)/50',
        '--my-color': 'red',
      }),
    ).toEqual({
      color: colorMix('var(--my-color)', 50),
      '--my-color': 'red',
    })
  })

  it('should handle non-standard CSS properties', () => {
    expect(
      css({
        '&[type="search"]': {
          '::-webkit-search-decoration': {
            WebkitAppearance: 'none',
            MozAppearance: 'none',
          },
          '::-webkit-search-cancel-button': {
            WebkitAppearance: 'none',
            MozAppearance: 'none',
          },
        },
      }),
    ).toEqual({
      '&[type="search"]': {
        '::-webkit-search-decoration': {
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        },
        '::-webkit-search-cancel-button': {
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        },
      },
    })
  })

  it('should handle array values', () => {
    expect(
      css([
        {
          w: '1',
        },
        {
          h: '1',
        },
        {
          px: '1',
        },
      ]),
    ).toEqual([
      {
        width: getCssVar('sizes.1'),
      },
      {
        height: getCssVar('sizes.1'),
      },
      {
        paddingLeft: getCssVar('spaces.1'),
        paddingRight: getCssVar('spaces.1'),
      },
    ])

    expect(
      css({
        '& > div': [
          {
            w: '1',
          },
          {
            color: 'blue.100',
          },
        ],
      }),
    ).toEqual({
      '& > div': [
        {
          width: getCssVar('sizes.1'),
        },
        {
          color: getCssVar('colors.blue.100'),
        },
      ],
    })
  })

  it('should handle nested array values', () => {
    expect(
      css([
        {
          w: '1',
        },
        [
          {
            h: '1',
          },
          [
            {
              px: '1',
            },
          ],
        ],
      ]),
    ).toEqual([
      {
        width: getCssVar('sizes.1'),
      },
      [
        {
          height: getCssVar('sizes.1'),
        },
        [
          {
            paddingLeft: getCssVar('spaces.1'),
            paddingRight: getCssVar('spaces.1'),
          },
        ],
      ],
    ])

    expect(
      css({
        _dark: {
          _hover: [
            {
              color: 'red.100',
            },
            [
              {
                bg: 'blue.100',
              },
            ],
          ],
        },
      }),
    ).toEqual({
      [SELECTOR_DARK]: {
        [SELECTOR_HOVER]: [
          {
            color: getCssVar('colors.red.100'),
          },
          [
            {
              backgroundColor: getCssVar('colors.blue.100'),
            },
          ],
        ],
      },
    })

    expect(
      css({
        _dark: [
          {
            _hover: [
              {
                color: 'red.100',
              },
              [
                {
                  bg: 'blue.100',
                },
              ],
            ],
          },
          {
            _active: {
              color: 'blue.200',
            },
          },
        ],
      }),
    ).toEqual({
      [SELECTOR_DARK]: [
        {
          [SELECTOR_HOVER]: [
            {
              color: getCssVar('colors.red.100'),
            },
            [
              {
                backgroundColor: getCssVar('colors.blue.100'),
              },
            ],
          ],
        },
        {
          [SELECTOR_ACTIVE]: {
            color: getCssVar('colors.blue.200'),
          },
        },
      ],
    })
  })

  it('should treat the array value as Interpolation when the key is a selector', () => {
    const originalValue = [
      {
        color: 'red.100',
      },
    ]
    const transformedValue = [
      {
        color: getCssVar('colors.red.100'),
      },
    ]

    expect(
      css({
        _hover: originalValue,
      }),
    ).toEqual({
      [SELECTOR_HOVER]: transformedValue,
    })

    expect(css({ '& > div': originalValue })).toEqual({
      '& > div': transformedValue,
    })

    expect(css({ div: originalValue })).toEqual({
      div: transformedValue,
    })

    expect(css({ '> div': originalValue })).toEqual({
      '> div': transformedValue,
    })

    expect(
      css({ '@media screen and (min-width: 900px)': originalValue }),
    ).toEqual({
      '@media screen and (min-width: 900px)': transformedValue,
    })

    expect(css({ '@supports (display: grid)': originalValue })).toEqual({
      '@supports (display: grid)': transformedValue,
    })

    expect(css({ '@keyframes slideIn': originalValue })).toEqual({
      '@keyframes slideIn': transformedValue,
    })

    expect(css({ '@layer components': originalValue })).toEqual({
      '@layer components': transformedValue,
    })

    expect(
      css({
        '.my-class': originalValue,
      }),
    ).toEqual({
      '.my-class': transformedValue,
    })

    expect(
      css({
        '#my-id': originalValue,
      }),
    ).toEqual({
      '#my-id': transformedValue,
    })

    expect(css({ '[data-test="test"]': originalValue })).toEqual({
      '[data-test="test"]': transformedValue,
    })

    expect(css({ 'span, div': originalValue })).toEqual({
      'span, div': transformedValue,
    })

    expect(css({ '*': originalValue })).toEqual({
      '*': transformedValue,
    })

    // @ts-expect-error
    expect(css({ color: originalValue })).not.toEqual({
      color: transformedValue,
    })
  })

  it('should handle CSS variables', () => {
    expect(
      css({
        color: 'var(--my-color)',
        '--my-color': 'red',
      }),
    ).toEqual({
      color: 'var(--my-color)',
      '--my-color': 'red',
    })

    expect(
      css({
        color: 'var(--my-color)',
        '--my-color': ['red', 'blue', 'green'],
      }),
    ).toEqual({
      color: 'var(--my-color)',
      [toMediaKey('500px')]: {
        '--my-color': 'red',
      },
      [toMediaKey('700px')]: {
        '--my-color': 'blue',
      },
      [toMediaKey('900px')]: {
        '--my-color': 'green',
      },
    })
  })

  it('should handle edge cases', () => {
    expect(css('')).toEqual('')
    expect(css(null)).toEqual('')
    expect(css(false)).toEqual('')
    expect(css(0)).toEqual('')
    expect(css(2)).toEqual(2)
    const componentSelector: ComponentSelector = { __emotion_styles: {} }
    expect(css(componentSelector)).toBe(componentSelector)

    const serializedStyles: SerializedStyles = { name: '', styles: '' }
    expect(css(serializedStyles)).toBe(serializedStyles)

    const animation = keyframes({
      '0%': {
        transform: 'translate3d(0, -15px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, -4px, 0)',
      },
    })

    expect(css(animation)).toBe(animation)

    expect(
      css({
        color: {
          // @ts-expect-error
          '': 'red',
        },
      }),
    ).toEqual({
      color: 'red',
    })
  })
})
