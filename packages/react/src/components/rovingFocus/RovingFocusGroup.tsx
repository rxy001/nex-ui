'use client'

import { cloneElement, useCallback, useMemo, useState } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { isValidNonFragmentElement, mergeProps, focus } from '@nex-ui/utils'
import { RovingFocusProvider } from './RovingFocusContext'
import { Collection, useCollection } from './Collection'
import type { RovingFocusItemData } from './Collection'
import type { KeyboardEvent } from 'react'
import type { RovingFocusContextValue } from './RovingFocusContext'
import type { RovingFocusGroupProps } from './types'
import type { CollectionItemData } from '../collection'

export function RovingFocusGroup<T extends string | number = string>(
  inProps: RovingFocusGroupProps<T>,
) {
  const props = inProps as unknown as RovingFocusGroupProps
  const {
    children,
    defaultFocusItemId,
    onFocusItemIdChange,
    orientation = 'both',
    focusItemId: focusItemIdProp,
    loop = false,
    ...remainingProps
  } = props

  const [focusItemId, setFocusItemId] = useControlledState(
    focusItemIdProp,
    defaultFocusItemId,
    onFocusItemIdChange,
  )

  const [firstItemId, setFirstItemId] = useState('')

  const collection = useCollection()

  const onItemFocus = useCallback(
    (id: string) => {
      setFocusItemId(id)
    },
    [setFocusItemId],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const focusIntent = getFocusIntent(event, orientation)

    if (!focusIntent) return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    event.preventDefault()

    const target = event.target as HTMLElement

    if (!event.currentTarget.contains(target)) return

    const items = collection.getItems().filter((item) => item.focusable)

    if (items.length === 0) return

    let nextItemElement: HTMLElement | null = null
    if (focusIntent === 'first') {
      nextItemElement = items[0].element
    } else if (focusIntent === 'last') {
      nextItemElement = items[items.length - 1].element
    } else {
      const currentItemIndex = items.findIndex(
        (item) => item.element === target,
      )

      if (currentItemIndex === -1) return

      let nextItemIndex = currentItemIndex + (focusIntent === 'next' ? 1 : -1)

      if (loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItemElement = items[nextItemIndex].element
      }
    }

    if (nextItemElement) focus(nextItemElement, false)
  }

  const handleItemsChange = (
    items: Array<CollectionItemData<RovingFocusItemData>>,
  ) => {
    setFirstItemId(items[0]?.id ?? '')

    if (focusItemId) {
      const isValidFocusItemId = items.some((item) => item.id === focusItemId)
      if (!isValidFocusItemId) {
        setFocusItemId('')
      }
    }
  }

  const ctx = useMemo<RovingFocusContextValue>(
    () => ({
      onItemFocus,
      focusItemId,
      firstItemId,
    }),
    [onItemFocus, firstItemId, focusItemId],
  )

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <Collection collection={collection} onItemsChange={handleItemsChange}>
      <RovingFocusProvider value={ctx}>
        {cloneElement(
          children,
          mergeProps(
            {
              onKeyDown: handleKeyDown,
            },
            children.props,
            remainingProps,
          ),
        )}
      </RovingFocusProvider>
    </Collection>
  )
}

function getFocusIntent(
  event: KeyboardEvent<HTMLElement>,
  orientation: RovingFocusGroupProps['orientation'],
) {
  const homeEndKeys = ['Home', 'End']
  const verticalKeys = ['ArrowUp', 'ArrowDown']
  const horizontalKeys = ['ArrowLeft', 'ArrowRight']

  if (
    orientation === 'vertical' &&
    ![...homeEndKeys, ...verticalKeys].includes(event.key)
  )
    return
  if (
    orientation === 'horizontal' &&
    ![...homeEndKeys, ...horizontalKeys].includes(event.key)
  )
    return

  if (
    orientation === 'both' &&
    ![...homeEndKeys, ...verticalKeys, ...horizontalKeys].includes(event.key)
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

RovingFocusGroup.displayName = 'RovingFocusGroup'
