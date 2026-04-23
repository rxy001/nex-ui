import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { CollectionItem } from './Collection'
import { useListNavigationContext } from './ListNavigationContext'
import type { PointerEvent, FocusEvent } from 'react'
import type { ListNavigationItemProps } from './types'

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

  useEffect(() => {
    if (!ref.current) return

    setTextValue(ref.current.textContent?.trim() ?? '')
  }, [children])

  if (!isValidNonFragmentElement(children)) {
    return null
  }

  const isHighlighted = ctx.highlightedId === id

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
            onPointerMove: () => ctx.onItemEnter(id),
            onPointerDown: () => ref.current?.focus(),
            onPointerLeave: (event: PointerEvent<HTMLElement>) =>
              ctx.onItemLeave(event),
            onFocus: () => ctx.onItemEnter(id),
            onBlur: (event: FocusEvent<HTMLElement>) => ctx.onItemLeave(event),
            'data-highlighted': isHighlighted ? 'true' : undefined,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

ListNavigationItem.displayName = 'ListNavigationItem'
