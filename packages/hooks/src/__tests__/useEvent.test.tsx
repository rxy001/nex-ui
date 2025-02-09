import { describe, it, expect, jest } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { useEvent } from '../useEvent'

describe('useEvent', () => {
  it('should call the provided function when the event occurs', () => {
    const mockFn = jest.fn()

    const { result } = renderHook(() => useEvent(mockFn))

    result.current('clicked')
    expect(mockFn).toHaveBeenCalledWith('clicked')
  })

  it('should return the same function reference after re-render', () => {
    const mockFn = jest.fn()

    const { result, rerender } = renderHook(() => useEvent(mockFn))
    const first = result.current

    rerender()
    expect(first).toBe(result.current)
  })
})
