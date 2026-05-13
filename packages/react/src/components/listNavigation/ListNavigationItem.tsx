'use client'

import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import { isValidNonFragmentElement, mergeProps, focus } from '@nex-ui/utils'
import { CollectionItem, useCollectionContext } from './Collection'
import { useListNavigationContext } from './ListNavigationContext'
import type { ListNavigationItemData } from './Collection'
import type { KeyboardEvent } from 'react'
import type { ListNavigationItemProps } from './types'
import type { CollectionItemData } from '../collection'

export function ListNavigationItem(props: ListNavigationItemProps) {
  const defaultId = useId()

  const {
    children,
    disabled,
    id = defaultId,
    textValue: textValueProp,
    ...remainingProps
  } = props

  const ref = useRef<HTMLElement>(null)

  const [textValue, setTextValue] = useState('')

  const ctx = useListNavigationContext()

  const collection = useCollectionContext()

  useEffect(() => {
    if (!ref.current) return

    setTextValue(ref.current.textContent?.trim() ?? '')
  }, [children])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.currentTarget !== (event.target as HTMLElement)) return

    const focusIntent = getFocusIntent(event, ctx?.orientation)

    if (!focusIntent) return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    event.preventDefault()

    const items = collection!.getItems().filter((item) => !item.disabled)

    if (items.length === 0) return

    let nextItem: CollectionItemData<ListNavigationItemData> | null = null
    if (focusIntent === 'first') {
      ;[nextItem] = items
    } else if (focusIntent === 'last') {
      nextItem = items[items.length - 1]
    } else {
      const currentItemIndex = items.findIndex(
        (item) => item.id === ctx?.highlightedId,
      )

      if (currentItemIndex === -1) return

      let nextItemIndex = currentItemIndex + (focusIntent === 'next' ? 1 : -1)

      if (ctx?.loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItem = items[nextItemIndex]
      }
    }
    if (nextItem) focus(nextItem.element, false)
  }

  if (!isValidNonFragmentElement(children)) {
    return null
  }

  const isHighlighted = ctx?.highlightedId === id

  return (
    <CollectionItem
      id={id}
      disabled={disabled}
      textValue={textValueProp ?? textValue}
    >
      {cloneElement(
        children,
        mergeProps(
          {
            ref,
            tabIndex: isHighlighted ? 0 : -1,
            onPointerMove: () => {
              ref.current?.focus()
            },
            onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
              if (event.defaultPrevented) return
              ctx?.setHighlightedId('')
              ctx?.contentRef.current?.focus()
            },
            onFocus: () => {
              ctx?.setHighlightedId(id)
            },
            onKeyDown: handleKeyDown,
            'data-highlighted': isHighlighted ? 'true' : undefined,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

const HOME_END_KEYS = ['Home', 'End']
const VERTICAL_KEYS = ['ArrowUp', 'ArrowDown']
const HORIZONTAL_KEYS = ['ArrowLeft', 'ArrowRight']

function getFocusIntent(
  event: KeyboardEvent<HTMLElement>,
  orientation?: 'vertical' | 'horizontal' | 'both',
) {
  if (!orientation) return

  if (
    orientation === 'vertical' &&
    ![...HOME_END_KEYS, ...VERTICAL_KEYS].includes(event.key)
  )
    return
  if (
    orientation === 'horizontal' &&
    ![...HOME_END_KEYS, ...HORIZONTAL_KEYS].includes(event.key)
  )
    return

  if (
    orientation === 'both' &&
    ![...HOME_END_KEYS, ...VERTICAL_KEYS, ...HORIZONTAL_KEYS].includes(
      event.key,
    )
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

ListNavigationItem.displayName = 'ListNavigationItem'
