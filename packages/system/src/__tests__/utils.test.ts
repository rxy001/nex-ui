import { add, subtract, multiply, divide, negate } from '../utils'
import { mergeRecipeConfigs } from '../index'

describe('mergeRecipeConfigs', () => {
  it('should merge two configs correctly', () => {
    const a = {
      base: {
        color: 'red',
        width: '100px',
      },
      variants: {
        size: {
          sm: {
            width: '50px',
          },
          md: {
            width: '75px',
          },
        },
        variant: {
          outlined: {
            border: '1px solid black',
          },
          solid: {
            backgroundColor: 'black',
          },
        },
      },
      compoundVariants: [
        {
          size: 'sm',
          variant: 'outlined',
          style: {
            borderColor: 'gray',
          },
        },
        {
          size: 'md',
          variant: 'outlined',
          style: {
            borderColor: 'darkgray',
          },
        },
        {
          size: ['sm', 'md'],
          variant: 'solid',
          style: {
            backgroundColor: 'darkblue',
          },
        },
      ],
      defaultVariants: {
        size: 'sm',
        variant: 'outlined',
      },
    }
    const b = {
      base: {
        color: 'blue',
        width: '200px',
        height: '200px',
      },
      variants: {
        size: {
          sm: {
            height: '50px',
          },
          md: {
            height: '75px',
          },
        },
      },
      compoundVariants: [
        {
          size: 'sm',
          variant: 'outlined',
          style: {
            borderBottomColor: 'lightgray',
          },
        },
        {
          size: ['sm', 'md'],
          variant: 'solid',
          style: {
            backgroundColor: 'orange',
          },
        },
      ],
      defaultVariants: {
        size: 'md',
      },
    }

    const mergedConfig = mergeRecipeConfigs(a, b)

    expect(mergedConfig).toEqual({
      base: {
        color: 'blue',
        width: '200px',
        height: '200px',
      },
      variants: {
        size: {
          sm: {
            width: '50px',
            height: '50px',
          },
          md: {
            width: '75px',
            height: '75px',
          },
        },
        variant: {
          outlined: {
            border: '1px solid black',
          },
          solid: {
            backgroundColor: 'black',
          },
        },
      },
      compoundVariants: [
        {
          size: 'sm',
          variant: 'outlined',
          style: {
            borderColor: 'gray',
          },
        },
        {
          size: 'md',
          variant: 'outlined',
          style: {
            borderColor: 'darkgray',
          },
        },
        {
          size: ['sm', 'md'],
          variant: 'solid',
          style: {
            backgroundColor: 'darkblue',
          },
        },
        {
          size: 'sm',
          variant: 'outlined',
          style: {
            borderBottomColor: 'lightgray',
          },
        },
        {
          size: ['sm', 'md'],
          variant: 'solid',
          style: {
            backgroundColor: 'orange',
          },
        },
      ],
      defaultVariants: {
        size: 'md',
        variant: 'outlined',
      },
    })
  })

  it('should handle empty configs', () => {
    const a = {}
    const b = {
      base: {
        color: 'blue',
      },
      variants: {
        size: {
          sm: {
            width: '50px',
          },
        },
        variant: {
          outlined: {
            border: '1px solid black',
          },
        },
      },
      compoundVariants: [
        {
          size: 'sm',
          variant: 'outlined',
          style: {
            borderColor: 'gray',
          },
        },
      ],
    }
    expect(mergeRecipeConfigs(a, b)).toEqual(b)
  })

  it('should merge responsive values correctly', () => {
    const a = {
      base: {
        width: '100px',
        height: {
          _sm: '50px',
          _md: '75px',
        },
        borderWidth: [1, 2],
        padding: [10, 20, 50],
      },
    }

    const b = {
      base: {
        width: [100, 200],
        height: {
          _xl: '100px',
        },
        borderWidth: 2,
        padding: [30, 20],
      },
    }

    const mergedConfig = mergeRecipeConfigs(a, b)
    expect(mergedConfig).toEqual({
      base: {
        width: [100, 200],
        height: {
          _sm: '50px',
          _md: '75px',
          _xl: '100px',
        },
        borderWidth: 2,
        padding: [30, 20, 50],
      },
    })
  })

  it('should merge conditional styles', () => {
    const a = {
      base: {
        color: {
          _DEFAULT: 'red',
        },
        backgroundColor: 'blue',
      },
    }

    const b = {
      base: {
        color: {
          _dark: 'green',
        },
        backgroundColor: {
          _light: 'yellow',
          _hover: 'orange',
        },
      },
    }

    const mergedConfig = mergeRecipeConfigs(a, b)
    expect(mergedConfig).toEqual({
      base: {
        color: {
          _DEFAULT: 'red',
          _dark: 'green',
        },
        backgroundColor: {
          _light: 'yellow',
          _hover: 'orange',
        },
      },
    })
  })
})

describe('calc', () => {
  describe('add', () => {
    it('should create correct addition expressions', () => {
      expect(add('10px', '20px')).toBe('calc(10px + 20px)')
      expect(add(5, 10)).toBe('calc(5 + 10)')
      expect(add('var(--x)', 15)).toBe('calc(var(--x) + 15)')
    })

    it('should handle multiple operands', () => {
      expect(add('10px', '20px', '30px')).toBe('calc(10px + 20px + 30px)')
    })

    it('should remove existing calc keywords', () => {
      expect(add('calc(10px)', 'calc(20px)')).toBe('calc((10px) + (20px))')
    })
  })

  describe('subtract', () => {
    it('should create correct subtraction expressions', () => {
      expect(subtract('100%', '30px')).toBe('calc(100% - 30px)')
      expect(subtract(20, 5)).toBe('calc(20 - 5)')
    })

    it('should handle multiple operands', () => {
      expect(subtract('100vw', '60px', '40px')).toBe(
        'calc(100vw - 60px - 40px)',
      )
    })
  })

  describe('multiply', () => {
    it('should create correct multiplication expressions', () => {
      expect(multiply('20px', 3)).toBe('calc(20px * 3)')
      expect(multiply(0.5, 'var(--scale)')).toBe('calc(0.5 * var(--scale))')
    })
  })

  describe('divide', () => {
    it('should create correct division expressions', () => {
      expect(divide('100%', 3)).toBe('calc(100% / 3)')
      expect(divide('60px', 'var(--divider)')).toBe(
        'calc(60px / var(--divider))',
      )
    })
  })

  describe('negate', () => {
    it('should negate positive numbers', () => {
      expect(negate(5)).toBe('-5')
      expect(negate(10.5)).toBe('-10.5')
    })

    it('should convert negative numbers to positive', () => {
      expect(negate(-5)).toBe('5')
      expect(negate('-20')).toBe('20')
    })

    it('should handle zero values', () => {
      expect(negate(0)).toBe('0')
      expect(negate(-0)).toBe('0')
    })

    it('should negate CSS unit values', () => {
      expect(negate('10px')).toBe('-10px')
      expect(negate('-20rem')).toBe('20rem')
    })

    it('should use multiplication fallback for non-numeric values', () => {
      expect(negate('var(--x)')).toBe('calc(var(--x) * -1)')
      expect(negate('auto')).toBe('calc(auto * -1)')
    })

    it('should handle calc expressions', () => {
      expect(negate('calc(10px + 5px)')).toBe('calc((10px + 5px) * -1)')
    })

    it('should handle numeric strings without units', () => {
      expect(negate('15')).toBe('-15')
      expect(negate('-25')).toBe('25')
    })
  })
})
