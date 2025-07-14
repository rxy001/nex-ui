'use client'

import { useCallback, useRef } from 'react'

/**
 * A custom React hook that returns a stable function reference.
 * This is useful to avoid unnecessary re-renders when passing functions as props.
 *
 * @param fn - The function to wrap.
 * @returns A stable function reference that always points to the latest version of `fn`.
 */
export const useEvent = <T extends Function>(fn: T) => {
  const latest = useRef<T>(fn)

  latest.current = fn

  return useCallback((...args: any[]) => {
    return latest.current(...args)
  }, []) as unknown as T
}
