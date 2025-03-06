import { describe, it, expect } from '@jest/globals'
import { defineSlotRecipe } from '../recipes'

describe('SlotRecieps', () => {
  const slots = {
    root: {
      margin: 5,
      padding: 5,
    },
    label: {
      color: 'gray',
    },
  }

  const variants = {
    size: {
      sm: {
        root: { w: 20, h: 20 },
        label: {
          fontSize: '14px',
        },
      },
      md: {
        root: { w: 30, h: 30 },
        label: {
          fontSize: '16px',
        },
      },
    },
    color: {
      red: {
        label: {
          color: 'red',
        },
      },
      blue: {
        label: {
          color: 'blue',
        },
      },
    },
    disabled: {
      true: {
        root: {
          cursor: 'not-allowed',
        },
      },
      false: {
        root: {
          cursort: 'pointer',
        },
      },
    },
  }

  it('should work without variants', () => {
    const slotRecipes = defineSlotRecipe({
      slots,
    })

    expect(slotRecipes()).toEqual({
      ...slots,
    })
  })

  it('should work with variants', () => {
    const slotRecipes = defineSlotRecipe({
      slots,
      variants,
    })

    expect(
      slotRecipes({
        color: 'blue',
        size: 'sm',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.size.sm.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.sm.label,
      },
    })
  })

  it('should support boolean variants', () => {
    const slotRecipes = defineSlotRecipe({
      slots,
      variants,
    })

    expect(
      slotRecipes({
        color: 'blue',
        disabled: true,
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.true.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })

    expect(
      slotRecipes({
        color: 'blue',
        disabled: false,
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.false.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })

    expect(
      slotRecipes({
        color: 'blue',
        disabled: undefined,
      }),
    ).toEqual({
      root: {
        ...slots.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })
  })

  it('should work with compoundVariants', () => {
    const slotRecipes = defineSlotRecipe({
      slots,
      variants,
      compoundVariants: [
        {
          color: 'blue',
          size: 'sm',
          css: {
            root: {
              borderRadius: '5px',
            },
          },
        },
        {
          color: 'blue',
          disabled: true,
          css: {
            root: {
              opacity: '0.5',
            },
          },
        },
      ],
    })

    expect(
      slotRecipes({
        color: 'blue',
        size: 'sm',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.size.sm.root,
        borderRadius: '5px',
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.sm.label,
      },
    })

    expect(
      slotRecipes({
        color: 'blue',
        disabled: true,
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.true.root,
        opacity: '0.5',
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })

    expect(
      slotRecipes({
        color: 'blue',
        disabled: false,
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.false.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })
  })

  it('should throw an error if the compoundVariants is not an array', () => {
    expect(() =>
      defineSlotRecipe({
        slots,
        // @ts-expect-error
        compoundVariants: {},
      }),
    ).toThrow()
  })

  it('should work without anything', () => {
    const recipe = defineSlotRecipe({})

    expect(recipe()).toEqual({})
  })

  it('should work with defaultVariants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
      defaultVariants: {
        color: 'blue',
        size: 'md',
        disabled: false,
      },
    })

    expect(slotRecipe()).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.false.root,
        ...variants.size.md.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.md.label,
      },
    })
  })

  it('should include the styles of the extended slot recipe', () => {
    const slotRecipes = defineSlotRecipe({ slots })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipes, {})

    expect(extendedSlotRecipe()).toEqual({
      ...slots,
    })
  })

  it('should include the styles of the extended slot recipe with variants', () => {
    const slotRecipes = defineSlotRecipe({ slots, variants })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipes, {})

    expect(
      extendedSlotRecipe({
        color: 'blue',
        disabled: true,
        size: 'md',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.true.root,
        ...variants.size.md.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.md.label,
      },
    })

    expect(
      extendedSlotRecipe({
        color: 'red',
        disabled: false,
        size: 'sm',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.false.root,
        ...variants.size.sm.root,
      },
      label: {
        ...slots.label,
        ...variants.color.red.label,
        ...variants.size.sm.label,
      },
    })

    expect(
      extendedSlotRecipe({
        color: 'blue',
        disabled: undefined,
        size: 'sm',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.size.sm.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.sm.label,
      },
    })
  })

  it('should include the styles of the extended slot recipe with compoundVariants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
      compoundVariants: [
        {
          color: 'blue',
          size: 'md',
          css: {
            root: {
              background: 'blue',
            },
          },
        },
        {
          color: 'red',
          size: 'sm',
          css: {
            root: {
              background: 'red',
            },
          },
        },
      ],
    })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipe, {})

    expect(extendedSlotRecipe()).toEqual({
      root: {
        ...slots.root,
      },
      label: {
        ...slots.label,
      },
    })

    expect(
      extendedSlotRecipe({
        color: 'blue',
        size: 'md',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.size.md.root,
        background: 'blue',
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.md.label,
      },
    })

    expect(
      extendedSlotRecipe({
        color: 'red',
        size: 'sm',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        ...variants.size.sm.root,
        background: 'red',
      },
      label: {
        ...slots.label,
        ...variants.color.red.label,
        ...variants.size.sm.label,
      },
    })
  })

  it('should include the styles of the extended slot recipe with defaultVariants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
      defaultVariants: {
        color: 'blue',
        size: 'md',
        disabled: true,
      },
    })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipe, {})

    expect(extendedSlotRecipe()).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.true.root,
        ...variants.size.md.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.md.label,
      },
    })
  })

  it('should override the styles of the extended slot recipe', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
    })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipe, {
      slots: {
        root: {
          borderColor: 'yellow',
        },
        label: {
          fontSize: '16px',
        },
      },
    })

    expect(extendedSlotRecipe()).toEqual({
      root: {
        ...slots.root,
        borderColor: 'yellow',
      },
      label: {
        ...slots.label,
        fontSize: '16px',
      },
    })
  })

  it('should override the styles of the extended slot recipe with variants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
    })

    const extendedSlotRecipe1 = defineSlotRecipe(slotRecipe, {
      variants: {
        color: {
          blue: {
            label: {
              color: 'blueviolet',
            },
          },
        },
      },
    })

    expect(
      extendedSlotRecipe1({
        color: 'blue',
      }),
    ).toEqual({
      root: {
        ...slots.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        color: 'blueviolet',
      },
    })

    const extendedSlotRecipe2 = defineSlotRecipe(slotRecipe, {
      variants: {
        type: {
          primary: {
            root: {
              background: 'blue',
            },
          },
        },
      },
    })

    expect(
      extendedSlotRecipe2({
        color: 'blue',
        type: 'primary',
      }),
    ).toEqual({
      root: {
        ...slots.root,
        background: 'blue',
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
      },
    })
  })

  it('should override the styles of the extended slot recipe with compoundVariants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
      compoundVariants: [
        {
          color: 'blue',
          size: 'sm',
          css: {
            root: {
              background: 'blue',
            },
          },
        },
      ],
    })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipe, {
      compoundVariants: [
        {
          color: 'blue',
          size: 'sm',
          css: {
            root: {
              padding: 5,
            },
          },
        },
      ],
    })

    expect(extendedSlotRecipe({ color: 'blue', size: 'sm' })).toEqual({
      root: {
        ...slots.root,
        ...variants.size.sm.root,
        background: 'blue',
        padding: 5,
      },
      label: {
        ...slots.label,
        ...variants.size.sm.label,
        ...variants.color.blue.label,
      },
    })
  })

  it('should override the styles of the extended slot recipe with defaultVariants', () => {
    const slotRecipe = defineSlotRecipe({
      slots,
      variants,
      defaultVariants: {
        color: 'blue',
        disabled: false,
        size: 'md',
      },
    })

    const extendedSlotRecipe = defineSlotRecipe(slotRecipe, {
      defaultVariants: {
        size: 'sm',
      },
    })

    expect(extendedSlotRecipe()).toEqual({
      root: {
        ...slots.root,
        ...variants.disabled.false.root,
        ...variants.size.sm.root,
      },
      label: {
        ...slots.label,
        ...variants.color.blue.label,
        ...variants.size.sm.label,
      },
    })
  })
})
