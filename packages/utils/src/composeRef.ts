import type { MutableRefObject } from 'react'

type Ref<T> = MutableRefObject<T | null> | ((instance: T | null) => void)

export function composeRef<T>(...refs: Ref<T>[]) {
  const list = refs.filter((ref) => ref)

  if (list.length === 1) {
    return list[0]
  }

  return (node: T) => {
    list.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = node
      }
    })
  }
}
