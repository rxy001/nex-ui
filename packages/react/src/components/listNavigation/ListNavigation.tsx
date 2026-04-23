import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { useControlledState, useEvent, useLatest } from '@nex-ui/hooks'
import { useCollection, Collection } from './Collection'
import { ListNavigationProvider } from './ListNavigationContext'
import type { KeyboardEvent, FocusEvent, PointerEvent } from 'react'
import type { ListNavigationProps } from './types'
import type { ListNavigationContextValue } from './ListNavigationContext'

export function ListNavigation(props: ListNavigationProps) {
  const {
    children,
    active,
    highlightedId: highlightedIdProp,
    onHighlightedChange,
    defaultHighlightedId = '',
    loop = false,
    orientation = 'vertical',
    onTypingChange: onTypingChangeProp,
    ...remainingProps
  } = props

  const [highlightedId, setHighlightedId] = useControlledState(
    highlightedIdProp,
    defaultHighlightedId,
    onHighlightedChange,
  )

  const searchKeyRef = useRef('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTypingChangeRef = useLatest(onTypingChangeProp)
  const ref = useRef<HTMLElement>(null)

  const collection = useCollection()

  const handleNavigation = (event: KeyboardEvent<HTMLElement>) => {
    let focusIntent: string | undefined = undefined

    const items = collection.getItems()

    if (items.length === 0) return

    if (!highlightedId) {
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

    let nextItemId: string | undefined

    if (focusIntent === 'first') {
      nextItemId = items[0].id
    } else if (focusIntent === 'last') {
      nextItemId = items[items.length - 1].id
    } else {
      const currentItemIndex = items.findIndex(
        (item) => item.id === highlightedId,
      )
      let nextItemIndex = currentItemIndex + (focusIntent === 'next' ? 1 : -1)

      if (loop || (nextItemIndex >= 0 && nextItemIndex < items.length)) {
        nextItemIndex = (nextItemIndex + items.length) % items.length
        nextItemId = items[nextItemIndex].id
      }
    }

    if (nextItemId) {
      setHighlightedId(nextItemId)
    }
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

    if (nextItem && nextItem.id !== currentItem?.id) {
      setHighlightedId(nextItem.id)
    }
    searchKeyRef.current = searchKey
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      searchKeyRef.current = ''
      onTypingChangeRef.current?.(false)
    }, 1000)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!active || !event.currentTarget.contains(event.target as HTMLElement))
      return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return

    handleNavigation(event)
    handleTypeahead(event)
  }

  const onItemEnter = useEvent((id: string) => {
    if (!active) return

    setHighlightedId(id)
  })

  const onItemLeave = useEvent(
    (event: FocusEvent<HTMLElement> | PointerEvent<HTMLElement>) => {
      if (!active) return

      setHighlightedId('')

      const relatedTarget = event.relatedTarget as HTMLElement | null
      if (ref.current?.contains(relatedTarget)) {
        return
      }
      ref.current?.focus()
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
