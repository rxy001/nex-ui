'use client'

import { cloneElement, useEffect, useRef } from 'react'
import { useLatest, useMergeRefs } from '@nex-ui/hooks'
import { isValidNonFragmentElement } from '@nex-ui/utils'
import { useCollectionContext } from './CollectionContext'
import type { CollectionItemProps } from './types'

export const CollectionItem = <ItemData extends {} = {}>({
  children,
  ...itemData
}: CollectionItemProps<ItemData>) => {
  const { register, unregister } = useCollectionContext()
  const ref = useRef<HTMLElement>(null)
  const itemDataRef = useLatest({
    element: ref,
    ...itemData,
  })

  const mergedRefs = useMergeRefs(ref, children?.props?.ref)

  useEffect(() => {
    register(itemDataRef)
    return () => {
      unregister(itemDataRef)
    }
  }, [itemDataRef, register, unregister])

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(children, {
    ref: mergedRefs,
  })
}
