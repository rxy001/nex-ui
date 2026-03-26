'use client'

import { cloneElement, useEffect, useRef } from 'react'
import { useLatest, useMergeRefs } from '@nex-ui/hooks'
import { isValidNonFragmentElement } from '@nex-ui/utils'
import { useCollectionContext } from './CollectionContext'
import type { CollectionItemProps } from './types'

export function CollectionItem<ItemData extends {} = {}>({
  children,
  ...itemData
}: CollectionItemProps<ItemData>) {
  const ctx = useCollectionContext()
  const ref = useRef<HTMLElement>(null)
  const itemDataRef = useLatest({
    element: ref,
    ...itemData,
  })

  const mergedRefs = useMergeRefs(ref, children?.props?.ref)

  useEffect(() => {
    ctx?.registerItem(itemDataRef)
    return () => {
      ctx?.unregisterItem(itemDataRef)
    }
  }, [ctx, itemDataRef])

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(children, {
    ref: mergedRefs,
  })
}

CollectionItem.displayName = 'CollectionItem'
