import { createRef } from 'react'
import type { RefCallback } from 'react'
import { describe, it, expect, jest } from '@jest/globals'
import { render } from '@testing-library/react'
import { composeRef } from '../composeRef'

describe('composeRef', () => {
  it('should return the single ref if only one ref is provided', () => {
    const ref1 = createRef()
    const composedRef = composeRef(ref1)
    expect(composedRef).toBe(ref1)
  })

  it('should call all function refs and set current for object refs when node is provided', () => {
    const ref1: React.MutableRefObject<string | null> = { current: null }
    const ref2 = jest.fn<RefCallback<string>>()
    const ref3: React.MutableRefObject<string | null> = { current: null }
    const ref4 = jest.fn<RefCallback<string>>()

    const composedRef = composeRef<string | null>(
      ref1,
      ref2,
      ref3,
      ref4,
      // eslint-disable-next-line @typescript-eslint/ban-types
    ) as Function
    composedRef('testValue')

    expect(ref1.current).toBe('testValue')
    expect(ref2).toHaveBeenCalledWith('testValue')
    expect(ref3.current).toBe('testValue')
    expect(ref4).toHaveBeenCalledWith('testValue')
  })

  it('should compose multiple ref', () => {
    const ref1 = createRef<HTMLDivElement>()
    const ref2 = createRef<HTMLDivElement>()
    const ref3 = createRef<HTMLDivElement>()
    const Component = () => {
      const composedRef = composeRef<HTMLDivElement>(ref1, ref2, ref3)
      return <div ref={composedRef}>123</div>
    }
    render(Component())
    expect(ref1.current).toBeInstanceOf(HTMLDivElement)
    expect(ref2.current).toBeInstanceOf(HTMLDivElement)
    expect(ref3.current).toBeInstanceOf(HTMLDivElement)
  })
})
