import { upperFirst } from '../shared/upperFirst'

describe('upperFirst', () => {
  test('returns empty string unchanged', () => {
    expect(upperFirst('')).toBe('')
  })

  test('capitalizes first character of a lowercase word', () => {
    expect(upperFirst('hello')).toBe('Hello')
  })

  test('leaves already capitalized word unchanged', () => {
    expect(upperFirst('Hello')).toBe('Hello')
  })

  test('only changes the first character and preserves the rest', () => {
    expect(upperFirst('hELLO')).toBe('HELLO')
  })

  test('handles single-character strings', () => {
    expect(upperFirst('a')).toBe('A')
  })

  test('does not modify strings that start with non-letter characters', () => {
    expect(upperFirst('1abc')).toBe('1abc')
    expect(upperFirst('-dash')).toBe('-dash')
  })

  test('preserves leading whitespace (first char is whitespace so nothing is capitalized)', () => {
    expect(upperFirst(' hello')).toBe(' hello')
  })

  test('handles unicode characters', () => {
    expect(upperFirst('ñandú')).toBe('Ñandú')
  })
})
