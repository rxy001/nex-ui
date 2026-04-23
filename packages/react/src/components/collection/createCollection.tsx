'use client'

import { createContext, isValidNonFragmentElement } from '@nex-ui/utils'
import { useEvent, useLatest, useMergeRefs } from '@nex-ui/hooks'
import { cloneElement, useEffect, useRef } from 'react'
import { CollectionStore as InternalCollectionStore } from './CollectionStore'
import type { CollectionItemData } from './CollectionStore'
import type {
  CollectionContextValue,
  CollectionProps,
  CollectionItemProps,
  CollectionStore,
} from './types'

export function createCollection<ItemData extends {}>(scope: string) {
  const [CollectionProvider, useCollectionContext] =
    createContext<CollectionContextValue<any> | null>({
      contextName: `${scope}-CollectionContext`,
      hookName: `${scope}-useCollectionContext`,
      providerName: `${scope}-CollectionProvider`,
      strict: false,
      defaultValue: null,
    })

  function Collection({
    children,
    collection,
    onItemsChange,
  }: CollectionProps<ItemData>) {
    const internalCollection = collection as InternalCollectionStore<ItemData>
    const listener = useEvent((items: CollectionItemData<ItemData>[]) => {
      onItemsChange?.(items)
    })

    useEffect(() => {
      internalCollection.registerListener(listener)

      return internalCollection.unregisterListener
    }, [internalCollection, listener])

    return (
      <CollectionProvider value={internalCollection}>
        {children}
      </CollectionProvider>
    )
  }

  Collection.displayName = `${scope}-Collection`

  function CollectionItem({
    children,
    ...itemData
  }: CollectionItemProps<ItemData>) {
    const ctx = useCollectionContext()
    const isMountedRef = useRef(false)
    const ref = useRef<HTMLElement>(null)
    const itemDataRef = useLatest({
      element: ref,
      ...itemData,
    })

    const previousItemDataRef = useRef(itemDataRef.current)

    const mergedRefs = useMergeRefs(ref, children?.props?.ref)

    useEffect(() => {
      ctx?.registerItem(itemDataRef)
      return () => {
        ctx?.unregisterItem(itemDataRef)
      }
    }, [ctx, itemDataRef])

    useEffect(() => {
      if (!isMountedRef.current) return
      isMountedRef.current = true

      const { element: previousElement, ...previousItemData } =
        previousItemDataRef.current
      const { element: currentElement, ...currentItemData } =
        itemDataRef.current

      if (
        previousElement.current !== currentElement.current ||
        JSON.stringify(previousItemData) !== JSON.stringify(currentItemData)
      ) {
        ctx?.notifyListener()
      }
    })

    if (!isValidNonFragmentElement(children)) {
      return children
    }

    return cloneElement(children, {
      ref: mergedRefs,
    })
  }

  CollectionItem.displayName = `${scope}-CollectionItem`

  function useCollection() {
    const storeRef = useRef<InternalCollectionStore<ItemData>>(null)

    if (!storeRef.current) {
      storeRef.current = new InternalCollectionStore<ItemData>()
    }

    return storeRef.current as CollectionStore<ItemData>
  }

  return [Collection, CollectionItem, useCollection] as const
}
