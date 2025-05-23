import { createTokens } from '../tokens/createTokens'

const PREFIX = 'test'

describe('createTokens', () => {
  it('should work correctly', () => {
    const { getToken, getGlobalCssVars } = createTokens({
      tokens: {
        colors: {
          white: '#fff',
          blue: {
            100: '#cce3fd',
            200: '#99c7fb',
          },
        },
        borderWidths: {
          sm: '1px',
        },
        borders: {
          sm: '1px solid',
        },
        fontFamilies: {
          body: 'system',
        },
        fontSizes: {
          sm: '12px',
        },
        fontWeights: {
          blod: '600',
        },
        lineHeights: {
          base: '1.4',
        },
        radii: {
          sm: '4px',
        },
        shadows: {
          sm: 'shadow',
        },
        sizes: {
          sm: '4px',
        },
        spaces: {
          sm: '4px',
        },
        transitions: {
          all: 'all 0.2s',
        },
        zIndexes: {
          min: 0,
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            _DEFAULT: 'pink',
            _dark: 'green',
            _light: 'yellow',
          },
        },
      },
      prefix: PREFIX,
    })

    expect(getToken('colors.white')).toMatchSnapshot()
    expect(getToken('colors.blue.100')).toMatchSnapshot()
    expect(getGlobalCssVars()).toMatchSnapshot()
  })

  it('should restrict the hierarchical structure of tokens', () => {
    const consoleSpy = jest.spyOn(console, 'error')

    const testToken = {
      sm: '1px',
      border: {
        sm: '1px',
      },
    }

    createTokens({
      tokens: {
        colors: {
          black: '#000',
          blue: { 100: 'blue' },
          white: {
            // @ts-expect-error
            metud: {
              100: '#fff',
            },
          },
        },
        // @ts-expect-error
        sizes: testToken,
        // @ts-expect-error
        borderWidths: testToken,
        // @ts-expect-error
        borders: testToken,
        // @ts-expect-error
        fontFamilies: testToken,
        // @ts-expect-error
        fontSizes: testToken,
        // @ts-expect-error
        fontWeights: testToken,
        // @ts-expect-error
        lineHeights: testToken,
        // @ts-expect-error
        radii: testToken,
        // @ts-expect-error
        shadows: testToken,
        // @ts-expect-error
        spaces: testToken,
        // @ts-expect-error
        transitions: testToken,
        // @ts-expect-error
        zIndexes: testToken,
      },
      semanticTokens: {},
      prefix: PREFIX,
    })

    expect(consoleSpy).toBeCalled()
    expect(consoleSpy).toBeCalledTimes(13)

    consoleSpy.mockRestore()
  })

  it('should support token reference syntax', () => {
    const { getToken, getGlobalCssVars } = createTokens({
      tokens: {
        colors: {
          blue: {
            100: 'blue',
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: '{colors.blue.100}',
        },
        borders: {
          sm: '1px solid {colors.blue.100}',
        },
      },
      prefix: PREFIX,
    })

    expect(getToken('colors.primary')).toMatchSnapshot()
    expect(getGlobalCssVars()).toMatchSnapshot()
  })

  it('should support nested semantic tokens', () => {
    const { getToken } = createTokens({
      tokens: {},
      semanticTokens: {
        colors: {
          primary: {
            button: {
              hover: 'yellow',
            },
            input: {
              hover: 'yellowgreen',
            },
          },
          secondary: {
            button: {
              hover: 'wheat',
            },
          },
        },
      },
      prefix: PREFIX,
    })

    expect(getToken('colors.primary.button.hover')?.originalValue).toBe(
      'yellow',
    )

    expect(getToken('colors.primary.input.hover')?.originalValue).toBe(
      'yellowgreen',
    )

    expect(getToken('colors.secondary.button.hover')?.originalValue).toBe(
      'wheat',
    )
  })

  it('should support light and dark conditions', () => {
    const { getToken, getGlobalCssVars } = createTokens({
      tokens: {
        colors: {
          yellow: {
            100: 'yellowgreen',
            200: 'whitesmoke',
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            DEFAULT: {
              _DEFAULT: 'yellow',
              _dark: '{colors.yellow.100}',
              _light: '{colors.yellow.200}',
            },
            hover: {
              _DEFAULT: 'yellow',
              _dark: '{colors.yellow.100}',
              _light: '{colors.yellow.200}',
            },
          },
        },
      },
      prefix: PREFIX,
    })

    expect(getToken('colors.primary')).toMatchSnapshot()
    expect(getToken('colors.primary.hover')).toMatchSnapshot()
    expect(getGlobalCssVars()).toMatchSnapshot()
  })

  it('should define the default value with the DEFAULT key in nested semantic tokens', () => {
    const { getToken } = createTokens({
      tokens: {},
      semanticTokens: {
        colors: {
          primary: {
            button: {
              DEFAULT: 'yellow',
              hover: 'yellowgreen',
            },
          },
        },
      },
      prefix: PREFIX,
    })
    expect(getToken('colors.primary.button')?.originalValue).toBe('yellow')
    expect(getToken('colors.primary.button.hover')?.originalValue).toBe(
      'yellowgreen',
    )
  })
})
