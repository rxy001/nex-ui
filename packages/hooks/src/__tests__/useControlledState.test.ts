import { act, renderHook } from '@testing-library/react'
import { useControlledState } from '../index'

describe('useControlledState', () => {
  it('should use defaultValue when value is undefined (uncontrolled)', () => {
    const { result } = renderHook(() =>
      useControlledState(undefined, 'default'),
    )
    expect(result.current[0]).toBe('default')
  })

  it('should use value when provided (controlled)', () => {
    const { result } = renderHook(() =>
      useControlledState('controlled', 'default'),
    )
    expect(result.current[0]).toBe('controlled')
  })

  it('should update state when uncontrolled', async () => {
    const { result } = renderHook(() =>
      useControlledState(undefined, 'default'),
    )
    await act(() => {
      result.current[1]('new value')
    })
    expect(result.current[0]).toBe('new value')
  })

  it('should call onChange when value changes', async () => {
    const onChange = jest.fn()
    const { result } = renderHook(() =>
      useControlledState(undefined, 'default', onChange),
    )
    await act(() => {
      // @ts-expect-error
      result.current[1]('changed')
    })
    expect(onChange).toHaveBeenCalledWith('changed')
  })

  it('should not update internal state when controlled', async () => {
    const onChange = jest.fn()
    const { result, rerender } = renderHook(
      ({ value }) => useControlledState(value, 'default', onChange),
      { initialProps: { value: 'controlled' } },
    )

    await act(() => {
      result.current[1]('new value')
    })

    expect(result.current[0]).toBe('controlled')
    expect(onChange).toHaveBeenCalledWith('new value')

    rerender({ value: 'parent updated' })
    expect(result.current[0]).toBe('parent updated')
  })

  it('should warn if setValue is called with a function', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const { result } = renderHook(() =>
      useControlledState(undefined, 'default'),
    )
    await act(() => {
      // @ts-expect-error
      result.current[1](() => 'bad')
    })
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('should warn when switching between controlled and uncontrolled', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const { rerender } = renderHook(
      ({ value }) => useControlledState(value, 'default'),
      { initialProps: { value: 'controlled' } },
    )

    // @ts-expect-error
    rerender({ value: undefined })
    expect(consoleError).toHaveBeenCalledTimes(1)

    rerender({ value: 'controlled' })
    expect(consoleError).toHaveBeenCalledTimes(2)

    consoleError.mockRestore()
  })
})
