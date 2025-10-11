import { renderHook } from '@testing-library/react'
import { useUnmount } from '../index'

describe('useUnmount', () => {
  it('should call the cleanup function on unmount', () => {
    const cleanup = jest.fn()
    const { unmount } = renderHook(() => useUnmount(cleanup))
    unmount()
    expect(cleanup).toHaveBeenCalled()
  })
})
