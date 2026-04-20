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
            tabIndex: -1,
            onPointerMove: () => ref.current?.focus(),
            onPointerLeave: (event: PointerEvent<HTMLElement>) =>
              ctx.onItemLeave(id, event),
            onFocus: () => ctx.onItemEnter(id),
            onBlur: (event: FocusEvent<HTMLElement>) =>
              ctx.onItemLeave(id, event),
            'data-highlighted': ctx.highlightedId === id ? 'true' : undefined,
          },
          children.props,
          remainingProps,
        ),
      )}
    </CollectionItem>
  )
}

ListNavigationItem.displayName = 'ListNavigationItem'
