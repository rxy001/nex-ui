import { renderHook } from '@testing-library/react'
import { useLatest } from '../index'

describe('useLatest', () => {
  it('should return a ref with the latest value', () => {
    const { result, rerender } = renderHook((value) => useLatest(value), {
      initialProps: 42,
    })
    expect(result.current.current).toBe(42)

    rerender(100)
    expect(result.current.current).toBe(100)

    rerender(200)
    expect(result.current.current).toBe(200)
  })
})
