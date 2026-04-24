import type { RefObject } from 'react'

export class CollectionStore<ItemData extends {} = {}> {
  #items: Item<ItemData>[] = []
  #listener: Listener<ItemData> | null = null

  notifyListener = () => {
    if (this.#listener) {
      this.#listener(this.getItems())
    }
  }

  #setItems = (updater: (args: Item<ItemData>[]) => Item<ItemData>[]) => {
    this.#items = updater(this.#items)
    this.notifyListener()
  }

  getItems = (): Array<CollectionItemData<ItemData>> => {
    return this.#items
      .map((item) => {
        return {
          ...item.current,
          element: item.current.element.current,
        }
      })
      .filter((item) => !!item.element)
  }

  registerItem = (item: Item<ItemData>) => {
    this.#setItems((items) =>
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
  }

  unregisterItem = (item: Item<ItemData>) => {
    this.#setItems((items) => items.filter((i) => i !== item))
  }

  registerListener = (listener: Listener<ItemData>) => {
    this.#listener = listener
    this.notifyListener()
  }

  unregisterListener = () => {
    this.#listener = null
  }
}

function isElementPreceding(a: HTMLElement, b: HTMLElement) {
  return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING)
}

export type Item<ItemData extends {} = {}> = RefObject<
  {
    element: RefObject<HTMLElement | null>
  } & ItemData
>

export type CollectionItemData<ItemData extends {} = {}> = {
  element: HTMLElement
} & ItemData

export interface Listener<ItemData extends {} = {}> {
  (items: Array<CollectionItemData<ItemData>>): void
}
