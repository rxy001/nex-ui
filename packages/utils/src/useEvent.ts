'use client'

import { useCallback, useRef } from 'react'
import type { Noop } from './types'

export const useEvent = <T extends Noop>(fn: T) => {
  const latest = useRef<T>(fn)

  latest.current = fn

  return useCallback((...args: any[]) => {
    return latest.current(...args)
  }, []) as T
}
