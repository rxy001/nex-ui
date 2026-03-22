'use client'

import { useMemo, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import type { Simplify } from '../../types/utils'
import type { InterItem, Listener } from './types'
import type { CollectionContextValue } from './CollectionContext'

export const useCollection = <ItemData extends {} = {}>() => {
  const itemsRef = useRef<InterItem<ItemData>[]>([])

  const listenerRef = useRef<Listener<ItemData> | null>(null)

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

  const notifyListener = useEvent(() => {
    if (listenerRef.current) {
      listenerRef.current(getItems())
    }
  })

  const setItems = useEvent(
    (updater: (args: InterItem<ItemData>[]) => InterItem<ItemData>[]) => {
      itemsRef.current = updater(itemsRef.current)
      notifyListener()
    },
  )

  const collection = useMemo<CollectionContextValue<ItemData>>(
    () => ({
      context: {
        registerItem: (item) => {
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
        unregisterItem: (item) => {
          setItems((items) => items.filter((i) => i !== item))
        },
        registerListener: (listener: Listener<ItemData>) => {
          listenerRef.current = listener
          notifyListener()
        },
        unregisterListener: () => {
          listenerRef.current = null
        },
      },
      getItems,
    }),
    [getItems, setItems, notifyListener],
  )

  return collection
}

function isElementPreceding(a: HTMLElement, b: HTMLElement) {
  return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING)
}
