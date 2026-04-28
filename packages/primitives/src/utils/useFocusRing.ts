'use client'

import { useEvent, useMergeRefs } from '@nex-ui/hooks'
import {
  addEventListener,
  ownerDocument,
  isFocusable,
  hasFocus,
} from '@nex-ui/utils'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Reference count: listeners are installed when the first component mounts and
// removed when the last component unmounts (fixes test-isolation leaks).
let globalListenerCount = 0
let removeGlobalListeners: (() => void) | null = null

// Treat keyboard as default modality.
let isKeyboardModality = true

function onGlobalMouseDown(event: MouseEvent) {
  const { target } = event
  if (!(target instanceof Element)) return

  const { activeElement } = ownerDocument(target)
  // If the user clicks the element that already has keyboard focus, keep
  // keyboard modality so the focus ring remains visible (e.g. tabbing to a
  // button then clicking it should not remove the ring).
  if (target === activeElement && isKeyboardModality) return
  isKeyboardModality = false
}

function onGlobalKeyDown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) return
  isKeyboardModality = true
}

export function useFocusRing<T extends UseFocusRingProps>(props: T) {
  const ref = useRef<HTMLElement>(null)
  const mergedRefs = useMergeRefs(ref, props.ref)
  const [focusVisible, setFocusVisible] = useState(false)

  // When the focusable element is disabled, it doesn't trigger a blur event
  // so we can't set focusVisible to false there. Instead, we have to do it
  // here by checking the element's disabled attribute.
  useEffect(() => {
    if (props.disabled && focusVisible) {
      setFocusVisible(false)
    }
  }, [props.disabled, focusVisible])

  // Handles both native autofocus and programmatic autoFocus on mount:
  //
  // Case 1 — native autofocus: the browser focuses the element before React
  // effects run, so onFocusCapture never fires for it. useLayoutEffect lets us
  // detect this synchronously before the first paint, avoiding a visible flash.
  //   1a. Initial page load — isKeyboardModality starts as `true`, ring shown. ✓
  //   1b. Dynamically rendered (e.g. Dialog opened by mouse) — ring suppressed. ✓
  //
  // Case 2 — programmatic autoFocus: element.focus() is deferred to a
  // microtask so all refs and effects are ready first. The actual focus call
  // triggers onFocusCapture, which sets focusVisible based on modality.
  // queueMicrotask preserves the async behaviour regardless of useLayoutEffect.
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    // Case 1 — native autofocus: the browser focuses the element before React
    // effects run, so onFocusCapture never fires for it. Check synchronously
    // before the first paint to avoid a visible flash.
    //   1a. Initial page load — isKeyboardModality starts as `true`, ring shown. ✓
    //   1b. Dynamically rendered (e.g. Dialog opened by mouse) — ring suppressed. ✓
    if (hasFocus(element)) {
      if (isKeyboardModality) setFocusVisible(true)
      return
    }
    // Case 2 — programmatic autoFocus: focus is deferred to a microtask so
    // all refs and effects are ready first (e.g. tabIndex set, Dialog fully
    // open). The actual focus call triggers onFocusCapture, which sets
    // focusVisible based on modality at that point.
    if (!props.autoFocus) return
    queueMicrotask(() => {
      if (element.ownerDocument.activeElement === element) return
      if (!isFocusable(element)) return
      element.focus()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ref.current) return
    if (globalListenerCount === 0) {
      const removeMouseDown = addEventListener(
        ownerDocument(ref.current),
        'mousedown',
        onGlobalMouseDown,
        true,
      )
      const removeKeyDown = addEventListener(
        ownerDocument(ref.current),
        'keydown',
        onGlobalKeyDown,
        true,
      )
      removeGlobalListeners = () => {
        removeMouseDown()
        removeKeyDown()
      }
    }
    globalListenerCount++
    return () => {
      globalListenerCount--
      if (globalListenerCount === 0) {
        removeGlobalListeners?.()
        removeGlobalListeners = null
      }
    }
  }, [])

  // When the element becomes hidden while focused, no blur fires.
  // Use IntersectionObserver to clear focusVisible in that case.
  useEffect(() => {
    if (!focusVisible) return
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(() => {
      if (!isFocusable(element)) {
        setFocusVisible(false)
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [focusVisible])

  const handleFocusVisible = (element: HTMLElement) => {
    // Some extensions (e.g. Password) dispatch keydown events on autofill
    // and immediately move focus away. Verify the element still has focus.
    if (!hasFocus(element)) return
    setFocusVisible(true)
  }

  // Handles the case where an element is focused via mouse (focusVisible = false)
  // and the user then presses a key. Without this, the focus ring would never
  // appear until the element is re-focused via keyboard.
  //
  // Uses queueBeforeEvent instead of setting focusVisible directly because some
  // keys cause the element to immediately lose focus (e.g. Enter on <a href>
  // triggers navigation). If focusout fires before the next animation frame,
  // the callback is cancelled and the ring is not shown.
  const { onKeyDownCapture } = props
  const handleKeyDownCapture = useEvent(
    (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDownCapture?.(event)

      if (event.defaultPrevented) return
      if (focusVisible) return
      if (event.metaKey || event.altKey || event.ctrlKey) return
      if (event.target !== event.currentTarget) return
      const element = event.currentTarget
      queueBeforeEvent(element, 'focusout', () => handleFocusVisible(element))
    },
  )

  const { onFocusCapture } = props
  const handleFocusCapture = useEvent(
    (event: React.FocusEvent<HTMLElement>) => {
      onFocusCapture?.(event)
      if (event.defaultPrevented) return
      if (event.target !== event.currentTarget) {
        setFocusVisible(false)
        return
      }
      const element = event.currentTarget
      if (isKeyboardModality || isAlwaysFocusVisible(element)) {
        queueBeforeEvent(element, 'focusout', () => handleFocusVisible(element))
      } else {
        setFocusVisible(false)
      }
    },
  )

  const { onBlur } = props
  const handleBlur = useEvent((event: React.FocusEvent<HTMLElement>) => {
    onBlur?.(event)
    if (event.defaultPrevented) return
    if (!isFocusEventOutside(event)) return
    setFocusVisible(false)
  })

  props = {
    ...props,
    ref: mergedRefs,
    onBlur: handleBlur,
    onKeyDownCapture: handleKeyDownCapture,
    onFocusCapture: handleFocusCapture,
  }

  return {
    focusVisible,
    props,
  }
}

function isFocusEventOutside(event: React.FocusEvent): boolean {
  const container = event.currentTarget
  const related = event.relatedTarget
  return !related || !container.contains(related)
}

/**
 * Schedules `callback` on the next animation frame, but fires it immediately
 * (and synchronously) if `type` is dispatched on `element` first.
 */
function queueBeforeEvent(
  element: Element,
  type: string,
  callback: () => void,
): () => void {
  const cancelTimer = (() => {
    const id = requestAnimationFrame(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      element.removeEventListener(type, callSync, true)
      callback()
    })
    return () => cancelAnimationFrame(id)
  })()
  const callSync = () => {
    cancelTimer()
    callback()
  }
  element.addEventListener(type, callSync, { once: true, capture: true })
  return () => {
    cancelTimer()
    element.removeEventListener(type, callSync, true)
  }
}

const alwaysFocusVisibleInputTypes = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
  'number',
  'date',
  'month',
  'week',
  'time',
  'datetime',
  'datetime-local',
]

function isAlwaysFocusVisible(element: HTMLElement) {
  const { tagName, readOnly, type } = element as HTMLInputElement
  if (tagName === 'TEXTAREA' && !readOnly) return true
  if (tagName === 'SELECT' && !readOnly) return true
  if (tagName === 'INPUT' && !readOnly) {
    return alwaysFocusVisibleInputTypes.includes(type)
  }
  if (element.isContentEditable) return true
  const role = element.getAttribute('role')
  if (role === 'combobox' && element.dataset.name) return true
  return false
}

export interface UseFocusRingProps {
  disabled?: boolean
  autoFocus?: boolean
  ref?: React.Ref<HTMLElement>
  onBlur?: React.FocusEventHandler
  onFocusCapture?: React.FocusEventHandler
  onKeyDownCapture?: React.KeyboardEventHandler
}
