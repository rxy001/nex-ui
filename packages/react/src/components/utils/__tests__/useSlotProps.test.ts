import { renderHook } from '@testing-library/react'
import { useSlotProps } from '../useSlotProps'
import type { UseSlotPropsArgs } from '../useSlotProps'

describe('useSlotProps', () => {
  it('should return merged props based on the order of additionalProps, externalForwardedProps, externalSlotProps and a11y', () => {
    const additionalProps = { 'aria-label': 'additional' }
    const externalForwardedProps = { 'aria-label': 'forwarded' }
    const externalSlotProps = { 'aria-label': 'slot' }
    const a11y = { 'aria-label': 'a11y' }

    const { result, rerender } = renderHook(
      (args: UseSlotPropsArgs) => useSlotProps(args),
      {
        initialProps: {
          additionalProps,
        } as UseSlotPropsArgs,
      },
    )

    expect(result.current).toMatchObject({
      'aria-label': 'additional',
    })

    rerender({
      additionalProps,
      externalForwardedProps,
    })

    expect(result.current).toMatchObject({
      'aria-label': 'forwarded',
    })

    rerender({
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
    })

    expect(result.current).toMatchObject({
      'aria-label': 'slot',
    })

    rerender({
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
      a11y,
    })

    expect(result.current).toMatchObject({
      'aria-label': 'a11y',
    })
  })

  it('should return props.sx when no existing style', () => {
    const { result } = renderHook(() =>
      useSlotProps({
        additionalProps: { sx: { color: 'red' } },
      }),
    )

    expect(result.current.sx).toEqual({ color: 'red' })
  })

  it('should merge style with array sx', () => {
    const style = { color: 'red' }
    const sx = [{ margin: 10 }, { padding: 5 }]

    const { result } = renderHook(() =>
      useSlotProps({
        style,
        externalSlotProps: { sx },
      }),
    )

    expect(result.current.sx).toEqual([style, [{ margin: 10 }, { padding: 5 }]])
  })

  it('should merge style with plain object sx', () => {
    const style = { color: 'red' }
    const sx = { margin: 10 }

    const { result } = renderHook(() =>
      useSlotProps({
        style,
        externalSlotProps: { sx },
      }),
    )

    expect(result.current.sx).toEqual([style, sx])
  })

  it('should memoize sx calculation', () => {
    const style = { color: 'red' }
    const props = { externalSlotProps: { sx: { margin: 10 } } }

    const { result, rerender } = renderHook((args) => useSlotProps(args), {
      initialProps: { style, ...props },
    })

    const firstSx = result.current.sx
    rerender({ style, ...props })
    const secondSx = result.current.sx

    expect(firstSx).toBe(secondSx)
  })
})
