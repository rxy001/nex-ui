'use client'

import { cloneElement, useEffect, useMemo, useRef } from 'react'
import { useControlledState, useIsUsingKeyboard } from '@nex-ui/hooks'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { Collection, useCollection } from './Collection'
import { CompositeProvider } from './CompositeContext'
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
    () => ({ orientation, loop, activeId, setActiveId }),
    [orientation, loop, activeId, setActiveId],
  )

  const handleItemsChange = (
    items: Array<CollectionItemData<CompositeItemData>>,
  ) => {
    const activeItem = items.find((item) => item.id === activeId)

    if (!activeItem || activeItem.disabled) {
      const filteredItems = items.filter((item) => !item.disabled)
      if (filteredItems.length > 0) setActiveId(filteredItems[0].id)
    }
  }

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
        {cloneElement(children, mergeProps(children.props, remainingProps))}
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
