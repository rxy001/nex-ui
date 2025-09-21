import { generateSlotClasses } from '../generateSlotClasses'

describe('generateSlotClasses', () => {
  it('should generate slot classes for an array of class names', () => {
    const componentName = 'Button'
    const classNames = ['root', 'disabled', 'focused']

    const result = generateSlotClasses(componentName, classNames)

    expect(result).toEqual({
      root: 'Button-root',
      disabled: 'Button-disabled',
      focused: 'Button-focused',
    })
  })

  it('should handle empty array of class names', () => {
    const componentName = 'Button'
    const classNames: string[] = []

    const result = generateSlotClasses(componentName, classNames)

    expect(result).toEqual({})
  })

  it('should handle single class name', () => {
    const componentName = 'Input'
    const classNames = ['root']

    const result = generateSlotClasses(componentName, classNames)

    expect(result).toEqual({
      root: 'Input-root',
    })
  })

  it('should preserve type safety with string literal types', () => {
    const componentName = 'Checkbox'
    const classNames = ['checked', 'unchecked']

    const result = generateSlotClasses(componentName, classNames)

    expect(result).toEqual({
      checked: 'Checkbox-checked',
      unchecked: 'Checkbox-unchecked',
    })
  })
})
