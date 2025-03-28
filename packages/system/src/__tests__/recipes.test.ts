import { describe, it, expect } from '@jest/globals'
import { defineRecipe } from '../recipes'

describe('Recipe', () => {
  const base = {
    padding: 5,
    margin: 5,
  }

  const variants = {
    size: {
      sm: { w: 10, h: 10 },
      md: { w: 20, h: 20 },
    },
    color: {
      red: {
        color: 'red',
      },
      blue: {
        color: 'blue',
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {
        cursort: 'pointer',
      },
    },
  }

  it('should work without variants', () => {
    const recipe = defineRecipe({
      base,
    })

    expect(recipe()).toEqual(base)
  })

  it('should work with variants', () => {
    const recipe = defineRecipe({
      base,
      variants,
    })

    expect(
      recipe({
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
    })

    expect(
      recipe({
        color: 'blue',
      }),
    ).toEqual({
      ...base,
      ...variants.color.blue,
    })
  })

  it('should support boolean variants', () => {
    const recipe = defineRecipe({
      base,
      variants,
    })

    expect(recipe()).toEqual(base)

    expect(
      recipe({
        disabled: undefined,
      }),
    ).toEqual(base)

    expect(
      recipe({
        disabled: false,
      }),
    ).toEqual({
      ...base,
      ...variants.disabled.false,
    })

    expect(
      recipe({
        disabled: true,
      }),
    ).toEqual({
      ...base,
      ...variants.disabled.true,
    })
  })

  it('should work with compoundVariants', () => {
    const recipe = defineRecipe({
      base,
      variants,
      compoundVariants: [
        {
          size: 'md',
          color: 'red',
          css: {
            background: 'red',
          },
        },
        {
          color: 'red',
          disabled: true,
          css: {
            opacity: 0.5,
          },
        },
      ],
    })

    expect(
      recipe({
        size: 'sm',
        color: 'blue',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.blue,
    })

    expect(
      recipe({
        size: 'md',
        color: 'red',
      }),
    ).toEqual({
      ...base,
      ...variants.size.md,
      ...variants.color.red,
      background: 'red',
    })

    expect(
      recipe({
        disabled: true,
        color: 'red',
      }),
    ).toEqual({
      ...base,
      ...variants.color.red,
      ...variants.disabled.true,
      opacity: 0.5,
    })
  })

  it('should supports setting muliple variants at once in compoundVariants', () => {
    const recipe = defineRecipe({
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

    expect(
      recipe({
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
      recipe({
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

  it('should throw an error if the compoundVariants is not an array', () => {
    expect(() =>
      defineRecipe({
        base,
        // @ts-expect-error
        compoundVariants: {},
      }),
    ).toThrow()
  })

  it('should work without anything', () => {
    const recipe = defineRecipe({})

    expect(recipe()).toEqual({})
  })

  it('should work with defaultVariants', () => {
    const recipe = defineRecipe({
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
      defaultVariants: {
        size: 'sm',
        color: 'red',
        disabled: true,
      },
    })

    expect(recipe()).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.red,
      ...variants.disabled.true,
      background: 'red',
    })

    expect(recipe({ color: 'blue' })).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.blue,
      ...variants.disabled.true,
    })

    expect(recipe({ color: 'blue', disabled: undefined })).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.blue,
    })

    expect(recipe({ color: 'blue', disabled: false })).toEqual({
      ...base,
      ...variants.size.sm,
      ...variants.color.blue,
      ...variants.disabled.false,
    })
  })

  it('should include the styles of the extended recipe', () => {
    const recipe = defineRecipe({
      base,
    })

    const extendedRecipe = defineRecipe(recipe, {})

    expect(extendedRecipe()).toEqual(base)
  })

  it('should include the styles of the extended recipe with variants', () => {
    const recipe = defineRecipe({
      base,
      variants,
    })

    const extendedRecipe = defineRecipe(recipe, {})

    expect(
      extendedRecipe({
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.size.sm,
    })

    expect(
      extendedRecipe({
        color: 'blue',
      }),
    ).toEqual({
      ...base,
      ...variants.color.blue,
    })

    expect(
      extendedRecipe({
        disabled: undefined,
      }),
    ).toEqual({
      ...base,
    })

    expect(
      extendedRecipe({
        disabled: true,
      }),
    ).toEqual({
      ...base,
      ...variants.disabled.true,
    })
  })

  it('should include the styles of the extended recipe with compoundVariants', () => {
    const recipe = defineRecipe({
      base,
      variants,
      compoundVariants: [
        {
          color: 'red',
          size: 'sm',
          css: {
            background: 'red',
          },
        },
      ],
    })

    const extendedRecipe = defineRecipe(recipe, {})

    expect(
      extendedRecipe({
        color: 'red',
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.color.red,
      ...variants.size.sm,
      background: 'red',
    })
  })

  it('should include the styles of the extended recipe with defaultVariants', () => {
    const recipe = defineRecipe({
      base,
      variants,
      compoundVariants: [
        {
          color: 'red',
          size: 'sm',
          css: {
            background: 'red',
          },
        },
      ],
      defaultVariants: {
        color: 'red',
        size: 'sm',
      },
    })

    const extendedRecipe = defineRecipe(recipe, {})

    expect(extendedRecipe()).toEqual({
      ...base,
      ...variants.color.red,
      ...variants.size.sm,
      background: 'red',
    })
  })

  it('should override the styles of the extended recipe', () => {
    const recipe = defineRecipe({
      base,
    })

    const extendedRecipe = defineRecipe(recipe, {
      base: {
        h: '1',
        w: '2',
      },
    })

    expect(extendedRecipe()).toEqual({
      ...base,
      h: '1',
      w: '2',
    })
  })

  it('should override the styles of the extended recipe with variants', () => {
    const recipe = defineRecipe({
      base,
      variants,
    })

    const extendedRecipe1 = defineRecipe(recipe, {
      base: {
        h: '1',
        w: '2',
      },
      variants: {
        color: {
          red: {
            background: 'red',
          },
        },
      },
    })

    expect(
      extendedRecipe1({
        color: 'red',
      }),
    ).toEqual({
      ...base,
      h: '1',
      w: '2',
      ...variants.color.red,
      background: 'red',
    })

    const extendedRecipe2 = defineRecipe(recipe, {
      variants: {
        color: {
          red: {
            color: 'black',
            background: 'black',
          },
        },
      },
    })

    expect(
      extendedRecipe2({
        color: 'red',
      }),
    ).toEqual({
      ...base,
      ...variants.color.red,
      color: 'black',
      background: 'black',
    })

    const extendedRecipe3 = defineRecipe(recipe, {
      variants: {
        color: {
          black: {
            color: 'black',
            background: 'black',
          },
        },
      },
    })

    expect(
      extendedRecipe3({
        color: 'black',
      }),
    ).toEqual({
      ...base,
      color: 'black',
      background: 'black',
    })
  })

  it('should override the styles of the extended recipe with compoundVariants', () => {
    const recipe = defineRecipe({
      base,
      variants,
      compoundVariants: [
        {
          color: 'red',
          size: 'sm',
          css: {
            borderColor: 'red',
            background: 'red',
          },
        },
      ],
    })

    const extendedRecipe1 = defineRecipe(recipe, {
      compoundVariants: [
        {
          color: 'red',
          size: 'sm',
          css: {
            borderColor: 'yellow',
          },
        },
      ],
    })

    expect(
      extendedRecipe1({
        color: 'red',
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.color.red,
      ...variants.size.sm,
      borderColor: 'yellow',
      background: 'red',
    })

    const extendedRecipe2 = defineRecipe(recipe, {
      compoundVariants: [
        {
          color: 'red',
          size: 'sm',
          css: {
            fill: 'red',
          },
        },
      ],
    })

    expect(
      extendedRecipe2({
        color: 'red',
        size: 'sm',
      }),
    ).toEqual({
      ...base,
      ...variants.color.red,
      ...variants.size.sm,
      borderColor: 'red',
      background: 'red',
      fill: 'red',
    })
  })

  it('should override the styles of the extended recipe with defaultVariants', () => {
    const recipe = defineRecipe({
      base,
      variants,
      defaultVariants: {
        color: 'blue',
      },
    })

    const extendedRecipe = defineRecipe(recipe, {
      defaultVariants: {
        color: 'red',
      },
    })

    expect(extendedRecipe()).toEqual({
      ...base,
      ...variants.color.red,
    })
  })

  // it('should css work correctly', () => {
  //   const toCssVariable = (v: string) => `var(--${CSS_VARS_PREFIX}-${v})`

  //   const transformedBase = {
  //     paddingLeft: toCssVariable('spaces-1'),
  //     paddingRight: toCssVariable('spaces-1'),
  //     color: toCssVariable('colors-white'),
  //     backgroundColor: toCssVariable('colors-blue-100'),
  //     borderWidth: toCssVariable('borders-sm'),
  //     borderRadius: toCssVariable('radii-sm'),
  //     [SELECTOR_HORVER]: {
  //       color: 'yellow',
  //     },
  //   }

  //   const transformedVariants = {
  //     size: {
  //       sm: {
  //         width: toCssVariable('sizes-1'),
  //         height: toCssVariable('sizes-1'),
  //       },
  //       md: {
  //         width: toCssVariable('sizes-2'),
  //         height: toCssVariable('sizes-2'),
  //       },
  //     },
  //     color: {
  //       red: {
  //         color: 'red',
  //       },
  //       blue: {
  //         color: 'blue',
  //       },
  //     },
  //   }

  //   expect(css(recipe())).toEqual(transformedBase)
  //   expect(
  //     css(
  //       recipe({
  //         size: 'sm',
  //       }),
  //     ),
  //   ).toEqual({
  //     ...transformedBase,
  //     ...transformedVariants.size.sm,
  //   })

  //   expect(
  //     css(
  //       recipe({
  //         size: 'sm',
  //         color: 'blue',
  //       }),
  //     ),
  //   ).toEqual({
  //     ...transformedBase,
  //     ...transformedVariants.size.sm,
  //     ...transformedVariants.color.blue,
  //   })

  //   expect(
  //     css(
  //       recipe({
  //         size: 'sm',
  //         color: 'red',
  //       }),
  //     ),
  //   ).toEqual({
  //     ...transformedBase,
  //     ...transformedVariants.size.sm,
  //     ...transformedVariants.color.red,
  //     background: 'red',
  //   })

  //   expect(
  //     css(
  //       recipe({
  //         size: 'md',
  //         color: 'red',
  //       }),
  //     ),
  //   ).toEqual({
  //     ...transformedBase,
  //     ...transformedVariants.size.md,
  //     ...transformedVariants.color.red,
  //     background: 'red',
  //   })
  // })
})
