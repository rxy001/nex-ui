import { cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import { isValidNonFragmentElement, mergeProps, focus } from '@nex-ui/utils'
import { useEvent, useLatest } from '@nex-ui/hooks'
import { useCollection, Collection } from './Collection'
import { ListNavigationProvider } from './ListNavigationContext'
import type { KeyboardEvent, FocusEvent, PointerEvent } from 'react'
import type { ListNavigationProps } from './types'
import type { ListNavigationContextValue } from './ListNavigationContext'

/**
 * ListNavigation is a higher-level list interaction pattern.
 * It adds list-specific behavior such as initial focus intent and typeahead keyboard search.
 */

export function ListNavigation(props: ListNavigationProps) {
  const {
    children,
    initialFocusIntent,
    getInitialFocusElement: getInitialFocusElementProp,
    loop = false,
    orientation = 'vertical',
    onTypingChange: onTypingChangeProp,
    ...remainingProps
  } = props

  const [highlightedId, setHighlightedId] = useState<string>('')
  const searchKeyRef = useRef('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTypingChangeRef = useLatest(onTypingChangeProp)
  const getInitialFocusElementRef = useLatest(getInitialFocusElementProp)

  const ref = useRef<HTMLElement>(null)

  const collection = useCollection()

  const handleNavigation = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    let focusIntent: string | undefined = undefined

    const items = collection.getItems()

    if (items.length === 0) return

    if (!highlightedId && event.currentTarget === target) {
      if (event.key === 'ArrowDown') {
        focusIntent = 'first'
      } else if (event.key === 'ArrowUp') {
        focusIntent = 'last'
      }
    } else {
      focusIntent = getFocusIntent(event, orientation)
    }

    if (!focusIntent) return

    event.preventDefault()

    let nextItemElement: HTMLElement | null = null

    if (focusIntent === 'first') {
      nextItemElement = items[0].element
    } else if (focusIntent === 'last') {
      nextItemElement = items[items.length - 1].element
    } else {
      const currentItemIndex = items.findIndex(
        (item) => item.id === highlightedId,
      )
      let nextItemIndex = currentItemIndex + (focusIntent === 'next' ? 1 : -1)

      if (loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItemElement = items[nextItemIndex].element
      }
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
    const items = collection.getItems()

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

  // Handles focus entry into the navigation container and applies initial focus
  // in priority order: custom resolver first, then first/last intent fallback.
  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    if (e.currentTarget !== e.target || e.defaultPrevented) return

    // Prevent internal item focus on pointerleave.
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) return

    const items = collection.getItems().filter((item) => !item.disabled)

    if (items.length === 0) return

    const initialFocusElement =
      getInitialFocusElementRef.current?.(items) ?? null

    if (initialFocusElement) {
      // Wait for the position update of PopContent.
      queueMicrotask(() => {
        focus(initialFocusElement, false)
      })
      return
    }

    if (!initialFocusIntent) return

    let nextItemElement: HTMLElement | null = null

    if (initialFocusIntent === 'first') {
      nextItemElement = items[0].element
    } else if (initialFocusIntent === 'last') {
      nextItemElement = items[items.length - 1].element
    }

    if (nextItemElement) {
      // Wait for the position update of PopContent.
      queueMicrotask(() => {
        focus(nextItemElement, false)
      })
    }
  }

  const onItemEnter = useEvent((id: string) => {
    setHighlightedId(id)
  })

  const onItemLeave = useEvent(
    (
      id: string,
      event: FocusEvent<HTMLElement> | PointerEvent<HTMLElement>,
    ) => {
      setHighlightedId((current) => (current === id ? '' : current))
      if (event.type === 'pointerleave' && !event.defaultPrevented) {
        ref.current?.focus()
      }
    },
  )

  const ctx = useMemo<ListNavigationContextValue>(
    () => ({
      highlightedId,
      onItemEnter,
      onItemLeave,
    }),
    [highlightedId, onItemEnter, onItemLeave],
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
              ref,
              tabIndex: -1,
              onFocus: handleFocus,
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

function getFocusIntent(
  event: KeyboardEvent<HTMLElement>,
  orientation: 'vertical' | 'horizontal' | 'both',
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

ListNavigation.displayName = 'ListNavigation'
