'use client'

import { cloneElement, useMemo, useState } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { isValidNonFragmentElement, mergeProps, focus } from '@nex-ui/utils'
import { RovingFocusProvider } from './RovingFocusContext'
import { Collection, useCollection } from '../collection'
import type { KeyboardEvent, FocusEvent } from 'react'
import type { RovingFocusContextValue } from './RovingFocusContext'
import type { RovingFocusGroupProps, RovingFocusItemData } from './types'

export const RovingFocusGroup = (props: RovingFocusGroupProps) => {
  const {
    children,
    defaultFocusItemId,
    onFocusItemIdChange,
    orientation,
    focusItemId: focusItemIdProp,
    loop = false,
    ...remainingProps
  } = props

  const [focusItemId, setFocusItemId] = useControlledState(
    focusItemIdProp,
    defaultFocusItemId,
    onFocusItemIdChange,
  )

  const [focusableItemsCount, setFocusableItemsCount] = useState(0)

  const [usingShiftTab, setUsingShiftTab] = useState(false)

  const collection = useCollection<RovingFocusItemData>()

  const onItemFocus = useEvent((id: string) => {
    setFocusItemId(id)
  })

  const onItemBlur = useEvent(() => {
    setFocusItemId('')
  })

  const handleFocus = useEvent((event: FocusEvent<HTMLElement>) => {
    if (
      event.currentTarget === event.target &&
      !usingShiftTab &&
      !event.defaultPrevented
    ) {
      const items = collection.getItems().filter((item) => item.focusable)

      if (items.length === 0) return

      const activeItem = items.find((item) => item.active)

      if (activeItem) {
        focus(activeItem.element)
        return
      }

      const focusItem = items.find((item) => item.id === focusItemId)

      focus(focusItem?.element ?? items[0].element)
    }
  })

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab' && event.shiftKey) {
      // The focus timing of tabbing backwards is later than React render.
      setUsingShiftTab(true)
      return
    }

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
      const activeItemIndex = items.findIndex((item) => item.active)

      const currentFocusItemIndex = items.findIndex(
        (item) => item.id === focusItemId,
      )

      let nextItemIndex =
        activeItemIndex >= 0 ? activeItemIndex : currentFocusItemIndex

      nextItemIndex = nextItemIndex + (focusIntent === 'next' ? 1 : -1)

      if (loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItemElement = items[nextItemIndex].element
      }
    }

    if (nextItemElement) focus(nextItemElement)
  })

  const handleBlur = useEvent(() => {
    setUsingShiftTab(false)
  })

  const onFocusableItemMount = useEvent(() => {
    setFocusableItemsCount((count) => count + 1)
  })

  const onFocusableItemUnmount = useEvent(() => {
    setFocusableItemsCount((count) => count - 1)
  })

  const ctx = useMemo<RovingFocusContextValue>(
    () => ({
      onItemFocus,
      onItemBlur,
      focusItemId,
      onFocusableItemMount,
      onFocusableItemUnmount,
    }),
    [
      onItemFocus,
      onItemBlur,
      focusItemId,
      onFocusableItemMount,
      onFocusableItemUnmount,
    ],
  )

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <Collection context={collection.context}>
      <RovingFocusProvider value={ctx}>
        {cloneElement(
          children,
          mergeProps(
            {
              onKeyDown: handleKeyDown,
              onFocus: handleFocus,
              onBlur: handleBlur,
              tabIndex: usingShiftTab || !focusableItemsCount ? -1 : 0,
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
  if (
    orientation === 'vertical' &&
    ['ArrowLeft', 'ArrowRight'].includes(event.key)
  )
    return
  if (
    orientation === 'horizontal' &&
    ['ArrowUp', 'ArrowDown'].includes(event.key)
  )
    return

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      return 'prev'
    case 'ArrowDown':
    case 'ArrowRight':
      return 'next'
    case 'Home':
    case 'PageUp':
      return 'first'
    case 'End':
    case 'PageDown':
      return 'last'
    default:
      return
  }
}

RovingFocusGroup.displayName = 'RovingFocusGroup'
