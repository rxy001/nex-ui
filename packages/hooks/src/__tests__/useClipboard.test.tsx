import { act, renderHook } from '@testing-library/react'
import { useClipboard } from '../index'

describe('useClipboard', () => {
  const originalClipboard = { ...navigator.clipboard }

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()

    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    })
  })

  it('should warn if navigator.clipboard is not supported', async () => {
    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      result.current.copy('test')
    })

    expect(result.current.error).toEqual(
      new Error('useClipboard: navigator.clipboard is not supported'),
    )
  })

  it('should copy text to clipboard', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn((data: string) => Promise.resolve(data)),
      },
      configurable: true,
    })

    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      result.current.copy('test')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test')
    expect(result.current.copied).toBe(true)
    expect(result.current.error).toBeNull()

    await act(async () => {
      jest.runAllTimers()
    })

    expect(result.current.copied).toBe(false)
  })

  it('should handle copy errors', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(() => Promise.reject(new Error('Copy failed'))),
      },
      configurable: true,
    })

    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      result.current.copy('test')
    })

    expect(result.current.error).toEqual(new Error('Copy failed'))
    expect(result.current.copied).toBe(false)
    await act(async () => {
      result.current.reset()
    })
    expect(result.current.error).toBeNull()
    expect(result.current.copied).toBe(false)
  })

  it('should clear previous timeout when copy is called multiple times', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn((data: string) => Promise.resolve(data)),
      },
      configurable: true,
    })

    const { result } = renderHook(() => useClipboard())

    await act(async () => {
      result.current.copy('test1')
    })
    await act(async () => {
      result.current.copy('test2')
    })

    expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith('test2')
    expect(result.current.copied).toBe(true)
  })
})
