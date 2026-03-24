'use client'

import { cloneElement, useEffect, useId } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { CollectionItem } from '../collection'
import { useRovingFocusContext } from './RovingFocusContext'
import type { RovingFocusItemProps } from './types'

export function RovingFocusItem(props: RovingFocusItemProps) {
  const {
    children,
    active = false,
    id: idProp,
    focusable = true,
    ...remainingProps
  } = props
  const ctx = useRovingFocusContext()

  const defaultId = useId()
  const id = idProp ?? defaultId

  const handleFocus = () => {
    ctx?.onItemFocus(id)
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (!focusable) event.preventDefault()
  }

  useEffect(() => {
    if (focusable) {
      ctx?.onFocusableItemMount()
      return ctx?.onFocusableItemUnmount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusable, ctx?.onFocusableItemMount, ctx?.onFocusableItemUnmount])

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return (
    <CollectionItem id={id} focusable={focusable} active={active}>
      {cloneElement(
        children,
        mergeProps(
          {
            onFocus: handleFocus,
            onBlur: ctx?.onItemBlur,
            onMouseDown: handleMouseDown,
            tabIndex: ctx?.focusItemId === id || active ? 0 : -1,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

RovingFocusItem.displayName = 'RovingFocusItem'
