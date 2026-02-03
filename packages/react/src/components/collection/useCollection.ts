'use client'

import { useMemo, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import type { Simplify } from '../../types/utils'
import type { Item, CollectionContextValue } from './CollectionContext'

export const useCollection = <ItemData extends {} = {}>() => {
  const itemsRef = useRef<Item<ItemData>[]>([])

  const setItems = useEvent(
    (updater: (args: Item<ItemData>[]) => Item<ItemData>[]) => {
      itemsRef.current = updater(itemsRef.current)
    },
  )

  const ctx = useMemo<CollectionContextValue<ItemData>>(
    () => ({
      register: (item) => {
        setItems((items) =>
          [...items, item].sort((a, b) => {
            return !a.current.element.current || !b.current.element.current
              ? 0
              : isElementPreceding(
                    a.current.element.current,
                    b.current.element.current,
                  )
                ? -1
                : 1
          }),
        )
      },
      unregister: (item) => {
        setItems((items) => items.filter((i) => i !== item))
      },
    }),
    [setItems],
  )

  const getItems = useEvent(() => {
    const items: Array<Simplify<{ element: HTMLElement } & ItemData>> =
      itemsRef.current
        .map((item) => {
          return {
            ...item.current,
            element: item.current.element.current,
          }
        })
        .filter((item) => !!item.element)

    return items
  })

  return useMemo(
    () => ({
      getItems,
      context: ctx,
    }),
    [ctx, getItems],
  )
}

function isElementPreceding(a: HTMLElement, b: HTMLElement) {
  return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING)
}
