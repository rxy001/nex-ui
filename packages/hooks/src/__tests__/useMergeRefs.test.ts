import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useMergeRefs } from '../index'
import type { RefCallback } from 'react'

describe('useMergeRefs', () => {
  it('should merge refs correctly', () => {
    const { result } = renderHook(() => {
      const ref1 = useRef<number>(null)
      const ref2 = useRef<number>(null)
      const mergedRef = useMergeRefs(ref1, ref2)
      return { ref1, ref2, mergedRef }
    })

    const { ref1, ref2, mergedRef } = result.current

    ;(mergedRef as RefCallback<number>)(1)
    expect(ref1.current).toBe(1)
    expect(ref2.current).toBe(1)
  })
})
