'use client'

import { cloneElement, useId } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { CollectionItem } from './Collection'
import { useRovingFocusContext } from './RovingFocusContext'
import type { RovingFocusItemProps } from './types'

export function RovingFocusItem(props: RovingFocusItemProps) {
  const { children, id: idProp, focusable = true, ...remainingProps } = props
  const { onItemFocus, focusItemId, firstItemId } = useRovingFocusContext()

  const defaultId = useId()
  const id = idProp ?? defaultId

  const handleFocus = () => {
    onItemFocus?.(id)
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (!focusable) {
      event.preventDefault()
      return
    }
    onItemFocus?.(id)
  }

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const isTabbable =
    focusable && (focusItemId ? focusItemId === id : firstItemId === id)

  return (
    <CollectionItem id={id} focusable={focusable}>
      {cloneElement(
        children,
        mergeProps(
          {
            onFocus: handleFocus,
            onMouseDown: handleMouseDown,
            tabIndex: isTabbable ? 0 : -1,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

RovingFocusItem.displayName = 'RovingFocusItem'
