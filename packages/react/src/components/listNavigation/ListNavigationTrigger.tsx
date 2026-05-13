'use client'

import { isValidNonFragmentElement, mergeProps } from '@nex-ui/utils'
import { cloneElement, useRef } from 'react'
import {
  useListNavigationContext,
  useListNavigationRootContext,
} from './ListNavigationContext'
import { getSide } from '../utils/computePosition/utils'
import type { KeyboardEvent } from 'react'
import type { ListNavigationTriggerProps } from './types'
import type { Placement, Side } from '../utils'

const EDGE_OFFSET = 10

export function ListNavigationTrigger(props: ListNavigationTriggerProps) {
  const { children, ...remainingProps } = props
  const rootCtx = useListNavigationRootContext()
  const contentCtx = useListNavigationContext()
  const isNested = !!contentCtx
  const pointerDirRef = useRef<Side>('right')
  const lastPointerXRef = useRef(0)

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.currentTarget !== event.target) return

    if ([' ', 'Enter'].includes(event.key)) {
      rootCtx.keyRef.current = event.key
      return
    }

    if (event.key.startsWith('Arrow')) {
      rootCtx.keyRef.current = event.key
    }
  }

  const handleBlur = () => {
    if (!isNested) return
    contentCtx.setHighlightedId('')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const pointerXHasChanged = lastPointerXRef.current !== event.clientX

    // We don't use `event.movementX` for this check because Safari will
    // always return `0` on a pointer event.
    if (event.currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = event.clientX > lastPointerXRef.current ? 'right' : 'left'
      pointerDirRef.current = newDir
      lastPointerXRef.current = event.clientX
    }
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    if (!rootCtx.listRef.current || !isNested) return

    const list = rootCtx.listRef.current

    const rect = list.getBoundingClientRect()

    const { placement } = list.dataset

    const side = getSide(placement as Placement)

    const area = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left - (side === 'right' ? EDGE_OFFSET : 0),
      right: rect.right + (side === 'left' ? EDGE_OFFSET : 0),
    }

    if (side !== pointerDirRef.current) return false

    if (
      event.clientX < area.left ||
      event.clientX > area.right ||
      event.clientY < area.top ||
      event.clientY > area.bottom
    ) {
      return
    }

    event.preventDefault()
  }

  return cloneElement(
    children,
    mergeProps(
      {
        onKeyDown: handleKeyDown,
        onBlur: handleBlur,
        onPointerMove: handlePointerMove,
        onPointerLeave: handlePointerLeave,
      },
      children.props,
      remainingProps,
    ),
  )
}
