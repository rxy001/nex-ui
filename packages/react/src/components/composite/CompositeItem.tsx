import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { cloneElement, useId, useMemo } from 'react'
import { CollectionItem, useCollectionContext } from './Collection'
import { useCompositeContext } from './CompositeContext'
import { HOME_AND_END, VERTICAL_KEYS, HORIZONTAL_KEYS } from './constants'

import type { KeyboardEvent, FocusEvent } from 'react'
import type { CompositeItemData } from './Collection'
import type { CompositeItemProps } from './types'
import type { CompositeContextValue } from './CompositeContext'
import type { CollectionItemData } from '../collection'

export function CompositeItem<T extends string | number = string>(
  inProps: CompositeItemProps<T>,
) {
  const props = inProps as unknown as CompositeItemProps
  const { orientation, loop, setActiveId, activeId, virtualFocus } =
    useCompositeContext()
  const collection = useCollectionContext()
  const defaultId = useId()
  const { children, disabled, id = defaultId, ...remainingProps } = props

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget !== (event.target as HTMLElement)) return
    if (disabled) return

    setActiveId(id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.currentTarget !== (event.target as HTMLElement)) return

    const navigationIntent = getNavigationIntent(event, orientation)

    if (!navigationIntent) return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    event.preventDefault()

    const items = collection!.getItems().filter((item) => !item.disabled)

    if (items.length === 0) return

    let nextItem: CollectionItemData<CompositeItemData> | null = null
    if (navigationIntent === 'first') {
      ;[nextItem] = items
    } else if (navigationIntent === 'last') {
      nextItem = items[items.length - 1]
    } else {
      const currentItemIndex = items.findIndex((item) => item.id === activeId)

      if (currentItemIndex === -1) return

      let nextItemIndex =
        currentItemIndex + (navigationIntent === 'next' ? 1 : -1)

      if (loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItem = items[nextItemIndex]
      }
    }
    if (nextItem) {
      setActiveId(nextItem.id)
    }
  }

  const isTabbable = useMemo(() => {
    if (disabled || virtualFocus) return false

    return activeId === id
  }, [activeId, disabled, id, virtualFocus])

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <CollectionItem id={id} disabled={disabled}>
      {cloneElement(
        children,
        mergeProps(
          {
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            tabIndex: isTabbable ? 0 : -1,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

CompositeItem.displayName = 'CompositeItem'

function getNavigationIntent(
  event: KeyboardEvent<HTMLElement>,
  orientation: CompositeContextValue['orientation'],
) {
  if (
    orientation === 'vertical' &&
    ![...HOME_AND_END, ...VERTICAL_KEYS].includes(event.key)
  )
    return
  if (
    orientation === 'horizontal' &&
    ![...HOME_AND_END, ...HORIZONTAL_KEYS].includes(event.key)
  )
    return

  if (
    orientation === 'both' &&
    ![...HOME_AND_END, ...VERTICAL_KEYS, ...HORIZONTAL_KEYS].includes(event.key)
  ) {
    return
  }

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      return 'prev'
    case 'ArrowDown':
    case 'ArrowRight':
      return 'next'
    case 'Home':
      return 'first'
    case 'End':
      return 'last'
    default:
      return
  }
}
