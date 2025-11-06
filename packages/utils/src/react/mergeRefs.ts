import type { RefObject, Ref } from 'react'

export function mergeRefs<T>(...refs: (Ref<T> | undefined | null)[]) {
  const list = refs.filter((ref) => ref)

  if (list.length === 1) {
    return list[0]
  }

  return (node: T) => {
    list.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        ;(ref as RefObject<T>).current = node
      }
    })
  }
}
