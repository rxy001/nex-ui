import { useEffect } from 'react'
import { __DEV__, isFunction } from '@nex-ui/utils'
import { useLatest } from './useLatest'

export const useUnmount = (fn: () => void) => {
  if (__DEV__ && !isFunction(fn)) {
    console.error(
      `Warning: useUnmount expected parameter is a function, got ${typeof fn}`,
    )
  }

  const fnRef = useLatest(fn)

  useEffect(() => fnRef.current, [fnRef])
}
