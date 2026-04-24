import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { useControlledState, useIsUsingKeyboard } from '@nex-ui/hooks'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { Collection, useCollection } from './Collection'
import { CompositeProvider } from './CompositeContext'
import { HOME_AND_END, VERTICAL_KEYS, HORIZONTAL_KEYS } from './constants'
import type { KeyboardEvent } from 'react'
import type { CompositeProps } from './types'
import type { CompositeItemData } from './Collection'
import type { CompositeContextValue } from './CompositeContext'
import type { CollectionItemData } from '../collection'

export function Composite<T extends string | number = string>(
  inProps: CompositeProps<T>,
) {
  const props = inProps as unknown as CompositeProps

  const {
    children,
    onActiveIdChange,
    defaultActiveId,
    activeId: activeIdProp,
    orientation = 'both',
    loop = false,
    virtualFocus = false,
    ...remainingProps
  } = props

  const collection = useCollection()

  const [activeId, setActiveId] = useControlledState(
    activeIdProp,
    defaultActiveId,
    onActiveIdChange,
  )

  const previousActiveIdRef = useRef(activeId)

  const isUsingKeyboardRef = useIsUsingKeyboard()

  const ctx = useMemo<CompositeContextValue>(
    () => ({ orientation, loop, virtualFocus, activeId, setActiveId }),
    [orientation, loop, virtualFocus, activeId, setActiveId],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (event.currentTarget !== target) return

    const keys = [...HOME_AND_END]

    if (orientation === 'vertical' || orientation === 'both') {
      keys.push(...VERTICAL_KEYS)
    }

    if (orientation === 'horizontal' || orientation === 'both') {
      keys.push(...HORIZONTAL_KEYS)
    }

    if (!keys.includes(event.key)) return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return

    const activeItem = collection
      .getItems()
      .find((item) => item.id === activeId)

    if (activeItem?.element) return

    const keyMap = {
      Home: 'first',
      End: 'last',
      ArrowDown: 'first',
      ArrowUp: 'last',
      ArrowRight: 'first',
      ArrowLeft: 'last',
      PageUp: 'first',
      PageDown: 'last',
    }

    const navigationIntent = keyMap[event.key as keyof typeof keyMap]

    const items = collection.getItems().filter((item) => !item.disabled)
    if (navigationIntent === 'first') {
      const [firstItem] = items
      if (firstItem) setActiveId(firstItem.id)
    } else if (navigationIntent === 'last') {
      const lastItem = items[items.length - 1]
      if (lastItem) setActiveId(lastItem.id)
    }

    event.preventDefault()
  }

  const handleItemsChange = (
    items: Array<CollectionItemData<CompositeItemData>>,
  ) => {
    if (!activeId) return

    const activeItem = items.find((item) => item.id === activeId)

    if (!activeItem || activeItem.disabled) {
      const filteredItems = items.filter((item) => !item.disabled)
      if (filteredItems.length > 0) setActiveId(filteredItems[0].id)
    }
  }

  // const handleTypeahead = (event: KeyboardEvent<HTMLElement>) => {
  //   if (event.key.length !== 1) {
  //     return
  //   }

  //   if (event.key === ' ') {
  //     event.preventDefault()
  //   }

  //   onTypingChangeRef.current?.(true)
  //   const searchKey = searchKeyRef.current + event.key
  //   const items = collection.getItems()

  //   const currentItem = items.find((item) => item.id === highlightedId)
  //   const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1
  //   const orderedItems = [
  //     ...items.slice(currentItemIndex + 1),
  //     ...items.slice(0, currentItemIndex + 1),
  //   ]
  //   const isRepeated =
  //     searchKey.length > 1 &&
  //     Array.from(searchKey).every((char) => char === searchKey[0])
  //   const normalizedSearchKey = isRepeated ? searchKey[0]! : searchKey
  //   const nextItem = orderedItems.find((item) =>
  //     item.textValue.toLowerCase().startsWith(normalizedSearchKey),
  //   )

  //   if (nextItem && nextItem.element !== currentItem?.element) {
  //     focus(nextItem?.element, false)
  //   }
  //   searchKeyRef.current = searchKey
  //   if (timerRef.current) clearTimeout(timerRef.current)
  //   timerRef.current = setTimeout(() => {
  //     searchKeyRef.current = ''
  //     onTypingChangeRef.current?.(false)
  //   }, 1000)
  // }

  // Focus on the active item element. Only focus if the activeId changes from keyboard interaction.
  useEffect(() => {
    if (!isUsingKeyboardRef.current) return
    if (activeId === previousActiveIdRef.current) return
    previousActiveIdRef.current = activeId
    const activeItem = collection
      .getItems()
      .find((item) => item.id === activeId)

    if (!activeItem?.element) return
    focusIntoView(activeItem.element)
  }, [activeId, collection, isUsingKeyboardRef])

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <Collection collection={collection} onItemsChange={handleItemsChange}>
      <CompositeProvider value={ctx}>
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
      </CompositeProvider>
    </Collection>
  )
}

export function focusIntoView(element: HTMLElement) {
  if (!('scrollIntoView' in element)) {
    // @ts-expect-error
    element.focus()
  } else {
    element.focus({ preventScroll: true })
    element.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }
}

Composite.displayName = 'Composite'
