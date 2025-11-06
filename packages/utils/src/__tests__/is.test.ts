import {
  isNumber,
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from '../index'

describe('is utils', () => {
  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber('1')).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
  })

  it('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(class {})).toBe(false)
    expect(isFunction(123)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
  })

  it('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject('str')).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
  })

  it('isString', () => {
    expect(isString('abc')).toBe(true)
    expect(isString(String('abc'))).toBe(true)
    expect(isString(123)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
  })

  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(void 0)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
  })
})
