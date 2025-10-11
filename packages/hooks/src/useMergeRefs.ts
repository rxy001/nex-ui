import { mergeRefs } from '@nex-ui/utils'
import { useMemo } from 'react'
import { useLatest } from './useLatest'
import type { Ref } from 'react'

export const useMergeRefs = <T>(...refs: Array<Ref<T> | undefined>) => {
  const latest = useLatest(refs)

  return useMemo(() => {
    return mergeRefs(...latest.current)
  }, [latest])
}
