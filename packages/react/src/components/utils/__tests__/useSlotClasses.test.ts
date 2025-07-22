import { composeClasses } from '../composeClasses'
import { getUtilityClass } from '../getUtilityClass'
import { generateUtilityClass } from '../generateUtilityClass'

describe('generateUtilityClass', () => {
  it('should generate utility class with component name and slot', () => {
    const component = 'Test'
    const slot = 'root'
    const result = generateUtilityClass(component, slot)
    expect(result).toBe(`${component}-${slot}`)
  })
})

describe('getUtilityClass', () => {
  it('should return a function that generates utility classes', () => {
    const prefix = 'test-prefix'
    const utilityClassFn = getUtilityClass(prefix)
    const slotClass = 'button'
    const result = utilityClassFn(slotClass)
    expect(result).toBe(`${prefix}-${slotClass}`)
  })
})

describe('composeClasses', () => {
  const prefix = 'test-prefix'

  it('should compose classes for all slots', () => {
    const slots = {
      root: ['base', 'variant'],
      label: ['text'],
    }

    const result = composeClasses(slots, getUtilityClass(prefix))

    expect(result).toEqual({
      root: `${prefix}-base ${prefix}-variant`,
      label: `${prefix}-text`,
    })
  })

  it('should include custom classes when provided', () => {
    const slots = {
      root: ['base'],
      label: ['text'],
    }
    const classes = {
      root: 'custom-root',
      label: 'custom-label',
    }

    const result = composeClasses(slots, getUtilityClass(prefix), classes)

    expect(result).toEqual({
      root: `custom-root ${prefix}-base`,
      label: `custom-label ${prefix}-text`,
    })
  })

  it('should filter out non-string slot classes', () => {
    const slots = {
      root: ['base', null, undefined, false, 'variant'] as any,
    }

    const result = composeClasses(slots, getUtilityClass(prefix))

    expect(result).toEqual({
      root: `${prefix}-base ${prefix}-variant`,
    })
  })

  it('should handle partial custom classes', () => {
    const slots = {
      root: ['base'],
      label: ['text'],
      icon: ['icon'],
    }
    const classes = {
      root: 'custom-root',
    }

    const result = composeClasses(slots, getUtilityClass(prefix), classes)

    expect(result).toEqual({
      root: `custom-root ${prefix}-base`,
      label: `${prefix}-text`,
      icon: `${prefix}-icon`,
    })
  })

  it('should handle empty slots', () => {
    const slots = {
      root: [],
    }

    const result = composeClasses(slots, getUtilityClass(prefix))

    expect(result).toEqual({
      root: '',
    })
  })
})
