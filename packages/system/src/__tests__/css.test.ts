import { describe, it, expect, jest } from '@jest/globals'
import { createSystem } from '../system'
import { defineConfig } from '../defineConfig'
import { toMediaKey } from '../breakpoints'

const SELECTOR_HORVER = '&:not(:disabled):not([data-disabled=true]):hover'
const SELECTOR_ACTIVE = '&:not(:disabled):not([data-disabled=true]):active'
const CSS_VARS_PREFIX = 'test'

describe('css', () => {
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
      borders: { sm: '1px solid' },
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
      fontFamilies: {
        body: 'system',
      },
      zIndexes: {
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
      zIndex: 'zIndexes',
      transition: 'transitions',
      boxShadow: 'shadows',
    },
    selectors: {
      hover: SELECTOR_HORVER,
      active: SELECTOR_ACTIVE,
    },
    semanticTokens: {
      colors: {
        primary: '{colors.blue.100}',
        secondary: '{colors.blue.200}',
      },
    },
  })

  const { css, getGlobalCssVars, getToken } = createSystem(sysConfig)

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
      }),
    ).toEqual({
      width: getCssVar('sizes.1'),
    })
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
      zIndex: getCssVar('zIndexes.min'),
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
      [SELECTOR_HORVER]: {
        color: getCssVar('colors.white'),
      },
    })

    expect(
      css({
        // @ts-ignore
        color: {
          _hover: 'white',
        },
      }),
    ).toEqual({
      [SELECTOR_HORVER]: {
        color: getCssVar('colors.white'),
      },
    })
  })

  it('should support color placeholder', () => {
    expect(
      css({
        colorPalette: 'blue',
        // @ts-ignore
        backgroundColor: {
          _DEFAULT: 'colorPalette.100',
          _hover: 'colorPalette.200',
        },
        color: 'colorPalette.100',
      }),
    ).toEqual({
      color: getCssVar('colors.blue.100'),
      backgroundColor: getCssVar('colors.blue.100'),
      [SELECTOR_HORVER]: {
        backgroundColor: getCssVar('colors.blue.200'),
      },
    })
  })

  it('should throw an error if color placeholder is used without providing the colorPalette prop', () => {
    const consoleSpy = jest.spyOn(console, 'error')
    css({
      color: 'colorPalette.100',
    })
    expect(consoleSpy).toBeCalled()
  })

  it('should support responsive value (object)', () => {
    expect(
      css({
        // @ts-ignore
        width: {
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
  })

  it('should support responsive value (array)', () => {
    expect(
      css({
        // @ts-ignore
        width: ['1', '2'],
      }),
    ).toEqual({
      [toMediaKey('500px')]: {
        width: getCssVar('sizes.1'),
      },
      [toMediaKey('700px')]: {
        width: getCssVar('sizes.2'),
      },
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
    const consoleSpy = jest.spyOn(console, 'error')
    css({
      border: '1px solid {colors.pink.100}',
    })
    expect(consoleSpy).toBeCalled()
  })
})
