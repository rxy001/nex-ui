'use client'

import {
  __DEV__,
  addEventListener,
  isValidNonFragmentElement,
  mergeProps,
  ownerDocument,
  focus,
} from '@nex-ui/utils'
import { cloneElement, useEffect, useRef } from 'react'
import { useEvent, useLatest } from '@nex-ui/hooks'
import { getTabbable } from './getTabbable'
import { FocusTrapScope, FocusTrapManager } from './focusTrapManager'
import type { KeyboardEvent } from 'react'
import type { FocusTrapProps } from './types'

const focusTrapManager = new FocusTrapManager()

export const FocusTrap = ({
  children,
  active = false,
  loop = true,
  autoFocus = false,
  restoreFocus = true,
  paused = false,
  ...remainingProps
}: FocusTrapProps) => {
  const ref = useRef<HTMLElement>(null)
  const focusTrapScopeRef = useRef(new FocusTrapScope())
  const restoreFocusRef = useLatest(restoreFocus)
  const autoFocusRef = useLatest(autoFocus)
  const pausedRef = useLatest(paused)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active || !ref.current) return

    const doc = ownerDocument(ref.current)

    const removeFocusinEventListener = addEventListener(
      doc,
      'focusin',
      (event: FocusEvent) => {
        if (
          focusTrapScopeRef.current.paused ||
          pausedRef.current ||
          !ref.current
        )
          return

        const target = event.target as HTMLElement
        if (ref.current.contains(target)) {
          lastFocusedElementRef.current = target
        } else if (lastFocusedElementRef.current) {
          // When focus moves outside the focus trap, bring it back
          focus(lastFocusedElementRef.current)
        }
      },
    )

    const removeFocusoutEventListener = addEventListener(
      doc,
      'focusout',
      (event: FocusEvent) => {
        if (
          focusTrapScopeRef.current.paused ||
          pausedRef.current ||
          !ref.current
        )
          return

        const relatedTarget = event.relatedTarget as HTMLElement | null
        // istanbul ignore next
        if (relatedTarget === null) return

        if (
          !ref.current.contains(relatedTarget) &&
          lastFocusedElementRef.current
        ) {
          // Prevent focus from moving outside the focus trap
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
    }
  }, [active, pausedRef])

  useEffect(() => {
    if (ref.current && active) {
      const focusTrapScope = focusTrapScopeRef.current
      focusTrapManager.register(focusTrapScope)

      const doc = ownerDocument(ref.current)
      const previouslyFocusedElement = doc.activeElement as HTMLElement | null
      const focusInside = ref.current.contains(previouslyFocusedElement)

      if (!focusInside) {
        if (autoFocusRef.current) {
          const [first] = getTabbable(ref.current)
          focus(first)
        }
        if (doc.activeElement === previouslyFocusedElement) {
          focus(ref.current)
        }
      }

      return () => {
        // const node = restoredNodeRef.current as HTMLElement
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (restoreFocusRef.current && previouslyFocusedElement) {
          focus(previouslyFocusedElement)
        }
        focusTrapManager.unregister(focusTrapScope)
      }
    }
  }, [active, autoFocusRef, restoreFocusRef])

  const handleKeydown = useEvent((event: KeyboardEvent) => {
    // istanbul ignore next
    if (!active || focusTrapScopeRef.current.paused || pausedRef.current) return

    const tabKey =
      event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey

    const focusedElement = document.activeElement as HTMLElement | null

    if (tabKey && focusedElement) {
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
        onKeyDown: handleKeydown,
      },
      remainingProps,
      // @ts-ignore
      children.props,
    ),
  )
}

FocusTrap.displayName = 'FocusTrap'
