'use client'

import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { isValidNonFragmentElement, mergeProps, focus } from '@nex-ui/utils'
import { useControlledState, useLatest, useMergeRefs } from '@nex-ui/hooks'
import { useCollection, Collection } from './Collection'
import {
  ListNavigationProvider,
  useListNavigationContext,
  useListNavigationRootContext,
} from './ListNavigationContext'
import { focusIntoView } from '../composite/Composite'
import type { KeyboardEvent } from 'react'
import type { ListNavigationProps } from './types'
import type { ListNavigationContextValue } from './ListNavigationContext'

export function ListNavigation(props: ListNavigationProps) {
  const {
    children,
    active,
    activeId,
    onActiveIdChange,
    loop = false,
    orientation = 'vertical',
    onTypingChange: onTypingChangeProp,
    ...remainingProps
  } = props

  const [highlightedId, setHighlightedId] = useControlledState(
    activeId,
    undefined,
    onActiveIdChange,
  )
  const searchKeyRef = useRef('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTypingChangeRef = useLatest(onTypingChangeProp)
  const rootContext = useListNavigationRootContext()
  const parentCtx = useListNavigationContext()
  const isNested = !!parentCtx
  const orientationRef = useLatest(orientation)

  const ref = useRef<HTMLElement>(null)
  const mergedRefs = useMergeRefs(ref, rootContext.listRef)

  const collection = useCollection()

  const handleNavigation = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (highlightedId) return

    if (target !== event.currentTarget) return

    const items = collection.getItems().filter((item) => !item.disabled)

    if (items.length === 0) return

    const focusIntent = getFocusIntent({
      key: event.key,
      orientation: orientationRef.current,
    })

    if (!focusIntent) return

    event.preventDefault()

    let nextItemElement: HTMLElement | null = null

    if (focusIntent === 'first') {
      nextItemElement = items[0].element
    } else if (focusIntent === 'last') {
      nextItemElement = items[items.length - 1].element
    }

    if (nextItemElement) focus(nextItemElement, false)
  }

  const handleTypeahead = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key.length !== 1) {
      return
    }

    if (event.key === ' ') {
      event.preventDefault()
    }

    onTypingChangeRef.current?.(true)
    const searchKey = searchKeyRef.current + event.key
    const items = collection.getItems().filter((item) => !item.disabled)

    const currentItem = items.find((item) => item.id === highlightedId)
    const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1
    const orderedItems = [
      ...items.slice(currentItemIndex + 1),
      ...items.slice(0, currentItemIndex + 1),
    ]
    const isRepeated =
      searchKey.length > 1 &&
      Array.from(searchKey).every((char) => char === searchKey[0])
    const normalizedSearchKey = isRepeated ? searchKey[0]! : searchKey
    const nextItem = orderedItems.find((item) =>
      item.textValue.toLowerCase().startsWith(normalizedSearchKey),
    )

    if (nextItem && nextItem.element !== currentItem?.element) {
      focus(nextItem?.element, false)
    }
    searchKeyRef.current = searchKey
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      searchKeyRef.current = ''
      onTypingChangeRef.current?.(false)
    }, 1000)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.target as HTMLElement)) return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return

    handleNavigation(event)
    handleTypeahead(event)
  }

  const ctx = useMemo<ListNavigationContextValue>(
    () => ({
      loop,
      highlightedId,
      orientation,
      setHighlightedId,
      contentRef: ref,
    }),
    [highlightedId, loop, orientation, setHighlightedId],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        searchKeyRef.current = ''
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onTypingChangeRef.current?.(false)
      }
    }
  }, [onTypingChangeRef])

  useEffect(() => {
    const key = rootContext.keyRef.current
    rootContext.keyRef.current = ''
    if (active && key) {
      const items = collection.getItems().filter((item) => !item.disabled)
      if (items.length === 0) return

      const getInitialFocusIntent = () => {
        if ([' ', 'Enter'].includes(key)) {
          return 'first'
        }

        if (isNested) {
          if (isCorssOrientationKey(key, parentCtx.orientation)) {
            return 'first'
          }
          return
        }
        if (isMainOrientationToFirstKey(key, orientationRef.current)) {
          return 'first'
        }
        if (isMainOrientationToEndKey(key, orientationRef.current)) {
          return 'last'
        }
      }

      const focusIntent = getInitialFocusIntent()

      if (!focusIntent) return

      const nextItemElement =
        focusIntent === 'first'
          ? items[0].element
          : items[items.length - 1].element

      queueMicrotask(() => {
        focusIntoView(nextItemElement)
      })
    }
  }, [
    active,
    collection,
    isNested,
    orientationRef,
    parentCtx?.orientation,
    rootContext.keyRef,
  ])

  if (!isValidNonFragmentElement(children)) {
    return null
  }

  return (
    <Collection collection={collection}>
      <ListNavigationProvider value={ctx}>
        {cloneElement(
          children,
          mergeProps(
            {
              ref: mergedRefs,
              tabIndex: -1,
              onKeyDown: handleKeyDown,
            },
            children.props,
            remainingProps,
          ),
        )}
      </ListNavigationProvider>
    </Collection>
  )
}

const HOME_END_KEYS = ['Home', 'End']
const VERTICAL_KEYS = ['ArrowUp', 'ArrowDown']
const HORIZONTAL_KEYS = ['ArrowLeft', 'ArrowRight']

function getFocusIntent({
  key,
  orientation,
}: {
  key: string
  orientation: ListNavigationProps['orientation']
}) {
  const validKeys = [...HOME_END_KEYS]

  if (orientation === 'vertical') {
    validKeys.push(...VERTICAL_KEYS)
  } else if (orientation === 'horizontal') {
    validKeys.push(...HORIZONTAL_KEYS)
  } else if (orientation === 'both') {
    validKeys.push(...VERTICAL_KEYS, ...HORIZONTAL_KEYS)
  }

  if (!validKeys.includes(key)) return

  switch (key) {
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'End':
      return 'last'
    case 'ArrowDown':
    case 'ArrowRight':
    case 'Home':
      return 'first'
    default:
      return
  }
}

function isMainOrientationToFirstKey(
  key: string,
  orientation: ListNavigationProps['orientation'],
) {
  if (orientation === 'both') {
    return ['ArrowDown', 'ArrowRight'].includes(key)
  }
  if (orientation === 'vertical') {
    return 'ArrowDown' === key
  }
  if (orientation === 'horizontal') {
    return 'ArrowRight' === key
  }

  return false
}

function isMainOrientationToEndKey(
  key: string,
  orientation: ListNavigationProps['orientation'],
) {
  if (orientation === 'both') {
    return ['ArrowUp', 'ArrowLeft'].includes(key)
  }
  if (orientation === 'vertical') {
    return 'ArrowUp' === key
  }
  if (orientation === 'horizontal') {
    return 'ArrowLeft' === key
  }

  return false
}

function isCorssOrientationKey(
  key: string,
  orientation: ListNavigationProps['orientation'],
) {
  if (orientation === 'vertical') {
    return key === 'ArrowRight'
  }
  if (orientation === 'horizontal') {
    return key === 'ArrowDown'
  }
  if (orientation === 'both') {
    return ['ArrowRight', 'ArrowDown'].includes(key)
  }
  return false
}

ListNavigation.displayName = 'ListNavigation'
