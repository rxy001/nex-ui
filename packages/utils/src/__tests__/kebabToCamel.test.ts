import { kebabToCamel } from '../kebabToCamel'

describe('kebabToCamel', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(kebabToCamel('hello-world')).toBe('helloWorld')
    expect(kebabToCamel('foo-bar-baz')).toBe('fooBarBaz')
    expect(kebabToCamel('my-component')).toBe('myComponent')

    expect(kebabToCamel('hello')).toBe('hello')
    expect(kebabToCamel('test')).toBe('test')

    expect(kebabToCamel('-hello-world')).toBe('helloWorld')
    expect(kebabToCamel('--foo-bar')).toBe('fooBar')
    expect(kebabToCamel('---test')).toBe('test')

    expect(kebabToCamel('')).toBe('')
    expect(kebabToCamel('   ')).toBe('   ')

    expect(kebabToCamel(null as any)).toBe(null)
    expect(kebabToCamel(undefined as any)).toBe(undefined)
    expect(kebabToCamel(123 as any)).toBe(123)

    expect(kebabToCamel('-')).toBe('')
    expect(kebabToCamel('--')).toBe('')
    expect(kebabToCamel('---')).toBe('')

    expect(kebabToCamel('hello-world-')).toBe('helloWorld-')
    expect(kebabToCamel('foo-bar--')).toBe('fooBar--')

    expect(kebabToCamel('hello-World')).toBe('helloWorld')
    expect(kebabToCamel('foo-BAR-baz')).toBe('fooBarBaz')
  })
})
