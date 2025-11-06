import { camelCase } from '../index'

describe('camelCase', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz')
    expect(camelCase('my-component')).toBe('myComponent')

    expect(camelCase('hello')).toBe('hello')
    expect(camelCase('test')).toBe('test')

    expect(camelCase('-hello-world')).toBe('helloWorld')
    expect(camelCase('--foo-bar')).toBe('fooBar')
    expect(camelCase('---test')).toBe('test')

    expect(camelCase('')).toBe('')
    expect(camelCase('   ')).toBe('   ')

    expect(camelCase(null as any)).toBe(null)
    expect(camelCase(undefined as any)).toBe(undefined)
    expect(camelCase(123 as any)).toBe(123)

    expect(camelCase('-')).toBe('')
    expect(camelCase('--')).toBe('')
    expect(camelCase('---')).toBe('')

    expect(camelCase('hello-world-')).toBe('helloWorld-')
    expect(camelCase('foo-bar--')).toBe('fooBar--')

    expect(camelCase('hello-World')).toBe('helloWorld')
    expect(camelCase('foo-BAR-baz')).toBe('fooBarBaz')
  })
})
