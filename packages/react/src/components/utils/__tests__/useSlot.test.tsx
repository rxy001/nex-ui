import { createRef } from 'react'
import { renderHook } from '@testing-library/react'
import { useSlot } from '../useSlot'
import type { ButtonHTMLAttributes } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { UseSlotProps } from '../useSlot'

function Component(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { sx?: Interpolation },
) {
  return <button {...props} />
}

describe('useSlot', () => {
  it('should return component and getProps function', () => {
    const { result } = renderHook(() =>
      useSlot({
        component: () => <div />,
      }),
    )

    expect(result.current).toHaveLength(2)
    expect(typeof result.current[1]).toBe('function')
  })

  it('should merge props correctly based on the order of additionalProps, externalForwardedProps, externalSlotProps and ariaProps', () => {
    const ariaProps = { 'aria-label': 'aria' }
    const additionalProps = { 'aria-label': 'additional' }
    const externalForwardedProps = { 'aria-label': 'forwarded' }
    const externalSlotProps = { 'aria-label': 'slot' }

    const { result, rerender } = renderHook((args) => useSlot(args), {
      initialProps: {
        component: Component,
        ariaProps,
      } as UseSlotProps<typeof Component>,
    })

    expect(result.current[1]()).toMatchObject({
      'aria-label': 'aria',
    })

    rerender({
      component: Component,
      ariaProps,
      additionalProps,
    })

    expect(result.current[1]()).toMatchObject({
      'aria-label': 'additional',
    })

    rerender({
      component: Component,
      ariaProps,
      additionalProps,
      externalForwardedProps,
    })

    expect(result.current[1]()).toMatchObject({
      'aria-label': 'forwarded',
    })

    rerender({
      component: Component,
      ariaProps,
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
    })

    expect(result.current[1]()).toMatchObject({
      'aria-label': 'slot',
    })
  })

  it('should handle className merging', () => {
    const { result } = renderHook(() =>
      useSlot({
        component: Component,
        classNames: 'base-class',
        additionalProps: { className: 'additional-class' },
        externalForwardedProps: { className: 'forwarded-class' },
        externalSlotProps: { className: 'external-class' },
      }),
    )

    const [, getProps] = result.current
    const props = getProps()

    expect(props.className).toBe(
      'base-class additional-class forwarded-class external-class',
    )
  })

  it('should handle sx as array', () => {
    const mockSx1 = { color: 'red' }
    const mockSx2 = { backgroundColor: 'blue' }
    const style = { fontSize: '16px' }

    const { result, rerender } = renderHook((args) => useSlot(args), {
      initialProps: {
        component: Component,
        style,
        externalSlotProps: { sx: [mockSx1, mockSx2] },
      } as UseSlotProps<typeof Component>,
    })

    expect(result.current[1]().sx).toEqual([style, [mockSx1, mockSx2]])

    rerender({
      component: Component,
      externalSlotProps: { sx: [mockSx1, mockSx2] },
    })

    expect(result.current[1]().sx).toEqual([mockSx1, mockSx2])
  })

  it('should handle sx as plain object', () => {
    const style = { fontSize: '16px' }
    const sxObject = { color: 'red' }

    const { result, rerender } = renderHook((args) => useSlot(args), {
      initialProps: {
        component: Component,
        style,
        externalSlotProps: { sx: sxObject },
      } as UseSlotProps<typeof Component>,
    })

    expect(result.current[1]().sx).toEqual([style, sxObject])

    rerender({
      component: Component,
      externalSlotProps: { sx: sxObject },
    })

    expect(result.current[1]().sx).toEqual(sxObject)
  })

  it('should merge refs correctly', () => {
    const ref1 = createRef<HTMLDivElement>()
    const ref2 = createRef<HTMLDivElement>()
    const ref3 = createRef<HTMLDivElement>()

    const { result } = renderHook(() =>
      useSlot({
        component: Component,
        additionalProps: { ref: ref1 },
        externalForwardedProps: { ref: ref2 },
        externalSlotProps: { ref: ref3 },
      }),
    )

    const { ref } = result.current[1]()
    expect(ref).toBeInstanceOf(Function)

    // @ts-expect-error
    ref?.(1)

    expect(ref1.current).toBe(1)
    expect(ref2.current).toBe(1)
    expect(ref3.current).toBe(1)
  })
})
