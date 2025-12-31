import { useEffect, useRef } from 'react'
import { useEscapeKeydown, useLatest } from '@nex-ui/hooks'

export interface UseDismissHandlersProps {
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
  onFocusOutside?: (event: FocusEvent) => void
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void
}

export const useDismissHandlers = (props: UseDismissHandlersProps) => {
  const {
    onPointerDownOutside,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
  } = props

  const pointerDownOutside = usePointerDownOutside((event) => {
    onPointerDownOutside?.(event)
    onInteractOutside?.(event)
  })

  const focusOutside = useFocusOutside((event) => {
    onFocusOutside?.(event)
    onInteractOutside?.(event)
  })

  useEscapeKeydown((event) => {
    onEscapeKeyDown?.(event)
  })

  return {
    ...pointerDownOutside,
    ...focusOutside,
  }
}

function usePointerDownOutside(
  callback: (event: PointerEvent) => void,
  ownerDocument: Document = document,
) {
  const latestCallback = useLatest(callback)
  const isPointerInsideReactTreeRef = useRef(false)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        latestCallback.current(event)
      }

      isPointerInsideReactTreeRef.current = false
    }

    ownerDocument.addEventListener('pointerdown', handlePointerDown)

    return () => {
      ownerDocument.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [callback, latestCallback, ownerDocument])

  return {
    onPointerDownCapture: () => {
      isPointerInsideReactTreeRef.current = true
    },
  }
}

function useFocusOutside(
  onFocusOutside?: (event: FocusEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const handleFocusOutside = useLatest(onFocusOutside)
  const isFocusInsideReactTreeRef = useRef(false)

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        handleFocusOutside.current?.(event)
      }
    }
    ownerDocument.addEventListener('focusin', handleFocus)
    return () => ownerDocument.removeEventListener('focusin', handleFocus)
  }, [ownerDocument, handleFocusOutside])

  return {
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  }
}
