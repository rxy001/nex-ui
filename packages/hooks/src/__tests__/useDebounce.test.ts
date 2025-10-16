import { renderHook } from '@testing-library/react'
import { useDebounce } from '../index'

describe('useDebounce', () => {
  it('should debounce the function calls', () => {
    jest.useFakeTimers()
    const fn = jest.fn()
    const { result } = renderHook(() => useDebounce(fn, { wait: 500 }))

    result.current('first call')
    result.current('second call')
    result.current('third call')

    jest.advanceTimersByTime(400)
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('third call')

    jest.useRealTimers()
  })

  it('should have default wait time of 1000ms', () => {
    jest.useFakeTimers()
    const fn = jest.fn()
    const { result } = renderHook(() => useDebounce(fn))

    result.current('call')

    jest.advanceTimersByTime(900)
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('call')

    jest.useRealTimers()
  })
})
