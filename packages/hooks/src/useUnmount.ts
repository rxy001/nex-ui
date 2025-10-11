import { useEffect } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { useLatest } from './useLatest'

export const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn)

  useEffect(() => fnRef.current, [fnRef])
}
