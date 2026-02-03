'use client'

import { cloneElement, useEffect, useRef } from 'react'
import { useEscapeKeydown, useLatest } from '@nex-ui/hooks'
import {
  isValidNonFragmentElement,
  mergeProps,
  addEventListener,
} from '@nex-ui/utils'
import type {
  DismissibleLayerProps,
  PointerDownOutsideEvent,
  FocusOutsideEvent,
  EscapeKeyDownEvent,
} from './types'

const FOCUS_OUTSIDE_EVENT = 'dismissibleLayer.focusoutside'
const POINTER_DOWN_OUTSIDE_EVENT = 'dismissibleLayer.pointerdownoutside'
const ESCAPE_KEYDOWN_EVENT = 'dismissibleLayer.escapekeydown'

export const DismissibleLayer = (props: DismissibleLayerProps) => {
  const {
    onPointerDownOutside,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    children,
    ...remainingProps
  } = props

  const pointerDownOutside = usePointerDownOutside((event) => {
    onPointerDownOutside?.(event)
    onInteractOutside?.(event)

    if (!event.defaultPrevented) {
      onDismiss?.()
    }
  })

  const focusOutside = useFocusOutside((event) => {
    onFocusOutside?.(event)
    onInteractOutside?.(event)

    if (!event.defaultPrevented) {
      onDismiss?.()
    }
  })

  useEscapeKeydown((event) => {
    // When multiple DismissibleLayers are present, invoking event.preventDefault()
    // within one instance's onEscapeKeyDown handler will block the onDismiss callback
    // from executing in other instances.
    // Because in each callback function, the event is shared.
    dispatchCustomEvent<EscapeKeyDownEvent, KeyboardEvent>(
      ESCAPE_KEYDOWN_EVENT,
      (e) => {
        onEscapeKeyDown?.(e)
        if (!e.defaultPrevented) {
          onDismiss?.()
        }
      },
      {
        originalEvent: event,
      },
    )
  })

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(
    children,
    mergeProps(
      {
        ...pointerDownOutside,
        ...focusOutside,
      },
      children.props,
      remainingProps,
    ),
  )
}

function usePointerDownOutside(
  callback: (event: PointerDownOutsideEvent) => void,
  ownerDocument: Document = globalThis.document,
) {
  const latestCallback = useLatest(callback)
  const isPointerInsideReactTreeRef = useRef(false)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        // Pointer event isn't cancelable, so we create a custom event to allow preventing default
        dispatchCustomEvent(
          POINTER_DOWN_OUTSIDE_EVENT,
          latestCallback.current,
          {
            originalEvent: event,
          },
        )
      }

      isPointerInsideReactTreeRef.current = false
    }

    return addEventListener(ownerDocument, 'pointerdown', handlePointerDown)
  }, [latestCallback, ownerDocument])

  return {
    onPointerDownCapture: () => {
      isPointerInsideReactTreeRef.current = true
    },
  }
}

function useFocusOutside(
  callback?: (event: FocusOutsideEvent) => void,
  ownerDocument: Document = globalThis.document,
) {
  const latestCallback = useLatest(callback)
  const isFocusInsideReactTreeRef = useRef(false)

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        // Focusin event isn't cancelable, so we create a custom event to allow preventing default
        dispatchCustomEvent(FOCUS_OUTSIDE_EVENT, latestCallback.current, {
          originalEvent: event,
        })
      }
    }

    return addEventListener(ownerDocument, 'focusin', handleFocus)
  }, [ownerDocument, latestCallback])

  return {
    onFocusCapture: () => {
      isFocusInsideReactTreeRef.current = true
    },
    onBlurCapture: () => {
      isFocusInsideReactTreeRef.current = false
    },
  }
}

function dispatchCustomEvent<
  E extends CustomEvent,
  OriginalEvent extends Event,
>(
  type: string,
  callback: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent },
) {
  const target = detail.originalEvent.target as HTMLElement

  const customEvent = new CustomEvent(type, {
    detail,
    cancelable: true,
    bubbles: false,
  })

  if (callback) {
    target.addEventListener(type, callback as EventListener, {
      once: true,
    })
  }

  target.dispatchEvent(customEvent)
}
