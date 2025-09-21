import clsx from 'clsx'
import { mergeProps } from '../mergeProps'

// Mock chain to test event handler chaining
jest.mock('../chain', () => ({
  chain:
    (a: any, b: any) =>
    (...args: any[]) => {
      a(...args)
      b(...args)
    },
}))

describe('mergeProps', () => {
  it('merges simple props', () => {
    expect(mergeProps({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('overrides props with later values', () => {
    expect(mergeProps({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  it('chains event handlers', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const merged = mergeProps({ onClick: fn1 }, { onClick: fn2 })
    merged.onClick('arg')
    expect(fn1).toHaveBeenCalledWith('arg')
    expect(fn2).toHaveBeenCalledWith('arg')
  })

  it('merges className using clsx', () => {
    const merged = mergeProps({ className: 'foo' }, { className: 'bar' })
    expect(merged.className).toBe(clsx('foo', 'bar'))
  })

  it('merges style objects shallowly', () => {
    const merged = mergeProps(
      { style: { color: 'red', fontSize: 12 } },
      { style: { color: 'blue', fontWeight: 'bold' } },
    )
    expect(merged.style).toEqual({
      color: 'blue',
      fontSize: 12,
      fontWeight: 'bold',
    })
  })

  it('merges classNames using mergeWith and clsx', () => {
    const a = { root: 'foo', label: 'bar' }
    const b = { root: 'baz', label: 'qux' }
    const merged = mergeProps({ classNames: a }, { classNames: b })
    // Should merge each key with clsx
    expect(merged.classNames.root).toBe(clsx('foo', 'baz'))
    expect(merged.classNames.label).toBe(clsx('bar', 'qux'))
  })

  it('merges sx arrays', () => {
    const sx1 = [{ color: 'red' }]
    const sx2 = [{ color: 'blue' }]
    const merged = mergeProps({ sx: sx1 }, { sx: sx2 })
    expect(merged.sx).toEqual([...sx1, ...sx2])
  })

  it('handles null and undefined args', () => {
    expect(mergeProps(null, undefined, { a: 1 })).toEqual({ a: 1 })
    expect(mergeProps(undefined, { a: 1 }, null)).toEqual({ a: 1 })
  })

  it('preserves falsy values', () => {
    expect(mergeProps({ a: 0 }, { a: false })).toEqual({ a: false })
    expect(mergeProps({ a: null }, { a: undefined })).toEqual({ a: null })
  })

  it('handles no arguments', () => {
    expect(mergeProps()).toEqual({})
  })

  it('handles only one argument', () => {
    expect(mergeProps({ a: 1 })).toEqual({ a: 1 })
  })
})
