import { debounce } from '@nex-ui/utils'
import { useMemo } from 'react'
import { useLatest } from './useLatest'
import { useUnmount } from './useUnmount'

export interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

type noop = (...args: any[]) => any

export function useDebounce<T extends noop>(fn: T, options?: DebounceOptions) {
  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args)
        },
        wait,
        options,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useUnmount(() => {
    debounced.cancel()
  })

  return debounced
}
