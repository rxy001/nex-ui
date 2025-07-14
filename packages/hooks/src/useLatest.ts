'use client'

import { useRef } from 'react'

/**
 * A custom hook that returns a ref to the latest value.
 * This is useful to avoid stale closures in event handlers or effects.
 *
 * @param value - The value to keep track of.
 * @returns A ref object containing the latest value.
 *
 * @example
 * ```tsx
 * const latestValue = useLatest(someValue);
 * ```
 */
export const useLatest = <T>(value: T) => {
  const ref = useRef<T>(value)

  ref.current = value

  return ref
}
