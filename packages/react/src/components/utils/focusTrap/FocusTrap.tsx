import {
  __DEV__,
  addEventListener,
  isValidNonFragmentElement,
  mergeProps,
  ownerDocument,
} from '@nex-ui/utils'
import { cloneElement, useEffect, useRef } from 'react'
import { useEvent, useLatest } from '@nex-ui/hooks'
import { getTabbable } from './getTabbable'
import type { KeyboardEvent, FocusEvent as ReactFocusEvent } from 'react'
import type { FocusTrapProps } from './types'

export const FocusTrap = ({
  active,
  paused,
  children,
  loop = true,
  restoreFocus = true,
  ...remainingProps
}: FocusTrapProps) => {
  const ref = useRef<HTMLElement>(null)
  const restoredNodeRef = useRef<EventTarget>(null)
  const ignoreNextFocusRef = useRef<boolean>(false)
  const pausedRef = useLatest(paused)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  const handleFocus = useEvent((e: ReactFocusEvent<HTMLDivElement>) => {
    if (restoredNodeRef.current === null) {
      restoredNodeRef.current = e.relatedTarget
    }
  })

  useEffect(() => {
    if (!active || !ref.current) {
      return
    }

    const doc = ownerDocument(ref.current)

    if (!ref.current.contains(doc.activeElement)) {
      // If the focus is not inside the focus trap, focus the root element
      focus(ref.current)
    }

    return () => {
      const node = restoredNodeRef.current as HTMLElement
      if (restoreFocus && node) {
        ignoreNextFocusRef.current = true
        focus(node)
      }
    }
  }, [active, restoreFocus])

  useEffect(() => {
    if (!active || !ref.current) return

    const doc = ownerDocument(ref.current)

    const removeFocusinEventListener = addEventListener(
      doc,
      'focusin',
      (event: FocusEvent) => {
        if (pausedRef.current || !ref.current) return

        if (ignoreNextFocusRef.current) {
          ignoreNextFocusRef.current = false
          return
        }

        const target = event.target as HTMLElement
        if (ref.current.contains(target)) {
          lastFocusedElementRef.current = target
        }
      },
    )

    const removeFocusoutEventListener = addEventListener(
      doc,
      'focusout',
      (event: FocusEvent) => {
        if (pausedRef.current || !ref.current || ignoreNextFocusRef.current)
          return

        const relatedTarget = event.relatedTarget as HTMLElement | null
        // istanbul ignore next
        if (relatedTarget === null) return

        if (
          !ref.current.contains(relatedTarget) &&
          lastFocusedElementRef.current
        ) {
          focus(lastFocusedElementRef.current)
        }
      },
    )

    // When the focused element gets removed from the DOM, browsers move focus
    // back to the document.body. In this case, we move focus to the container
    // to keep focus trapped correctly.
    // istanbul ignore next
    const handleMutations = (mutations: MutationRecord[]) => {
      const focusedElement = document.activeElement as HTMLElement | null
      if (focusedElement !== document.body) return
      for (const mutation of mutations) {
        if (mutation.removedNodes.length > 0 && ref.current) focus(ref.current)
      }
    }

    const mutationObserver = new MutationObserver(handleMutations)
    if (ref.current)
      mutationObserver.observe(ref.current, {
        childList: true,
        subtree: true,
      })

    return () => {
      removeFocusinEventListener()
      removeFocusoutEventListener()
      mutationObserver.disconnect()
      lastFocusedElementRef.current = null
      ignoreNextFocusRef.current = false
    }
  }, [active, pausedRef])

  const handleKeydown = useEvent((event: KeyboardEvent) => {
    // istanbul ignore next
    if (!active) return
    if (pausedRef.current) return

    const isTabKey =
      event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey

    const focusedElement = document.activeElement as HTMLElement | null

    if (isTabKey && focusedElement) {
      const container = event.currentTarget as HTMLElement
      const tabbable: ReadonlyArray<HTMLElement> = getTabbable(container)
      const hasTabbableElementsInside = tabbable.length > 0

      // we can only wrap focus if we have tabbable edges
      if (!hasTabbableElementsInside) {
        if (focusedElement === container) event.preventDefault()
      } else {
        const [first] = tabbable
        const last = tabbable[tabbable.length - 1]
        if (!event.shiftKey && focusedElement === last) {
          event.preventDefault()
          if (loop) focus(first)
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault()
          if (loop) focus(last)
        }
      }
    }
  })

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  return cloneElement(
    children,
    mergeProps(
      {
        tabIndex: -1,
        ref: ref,
        onFocus: handleFocus,
        onKeyDown: handleKeydown,
      },
      remainingProps,
      children.props,
    ),
  )
}

FocusTrap.displayName = 'FocusTrap'

function focus(element: HTMLElement) {
  if (element && typeof element.focus === 'function') {
    element.focus({ preventScroll: true })
  }
}
