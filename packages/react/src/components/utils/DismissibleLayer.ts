import { cloneElement, useEffect, useRef } from 'react'
import { useEscapeKeydown, useLatest } from '@nex-ui/hooks'
import {
  isValidNonFragmentElement,
  mergeProps,
  addEventListener,
} from '@nex-ui/utils'
import type { ReactElement } from 'react'

export interface DismissibleLayerProps {
  children: ReactElement
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
  onFocusOutside?: (event: FocusEvent) => void
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void
}

export const DismissibleLayer = (props: DismissibleLayerProps) => {
  const {
    onPointerDownOutside,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    children,
    ...remainingProps
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

  // istanbul ignore if
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
      remainingProps,
      // @ts-ignore
      children.props,
    ),
  )
}

function usePointerDownOutside(
  callback: (event: PointerEvent) => void,
  ownerDocument: Document = globalThis?.document,
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

    return addEventListener(ownerDocument, 'pointerdown', handlePointerDown)
  }, [latestCallback, ownerDocument])

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
    onFocusCapture: () => {
      isFocusInsideReactTreeRef.current = true
    },
    onBlurCapture: () => {
      isFocusInsideReactTreeRef.current = false
    },
  }
}
