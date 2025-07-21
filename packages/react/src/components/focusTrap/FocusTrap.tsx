import { __DEV__, addEventListener, mergeRefs } from '@nex-ui/utils'
import {
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
} from 'react'
import { useLatest } from '@nex-ui/hooks'
import { getTabbable } from './getTabbable'
import type { FocusEvent } from 'react'
import type { FocusTrapProps } from './types'

export const FocusTrap = ({
  children,
  active,
  paused,
  restoreFocus = true,
}: FocusTrapProps) => {
  const rootRef = useRef<HTMLElement>(null)
  const sentinelStartRef = useRef<HTMLDivElement>(null)
  const sentinelEndRef = useRef<HTMLDivElement>(null)
  const lastKeydownRef = useRef<KeyboardEvent>(null)
  const pausedRef = useLatest(paused)
  const restoredNode = useRef<EventTarget>(null)
  const ignoreNextFocus = useRef<boolean>(false)
  const mergedRefs = mergeRefs(rootRef, children?.props.ref)

  useEffect(() => {
    if (!active || !rootRef.current) {
      return
    }

    if (!rootRef.current.contains(document.activeElement)) {
      // If the focus is not inside the focus trap, focus the root element
      rootRef.current?.focus()
    }

    return () => {
      const node = restoredNode.current as HTMLElement
      if (restoreFocus && node) {
        ignoreNextFocus.current = true
        node.focus()
      }
    }
  }, [active, restoreFocus])

  useEffect(() => {
    if (!active || !rootRef.current) {
      return
    }

    const trapFocus = () => {
      const rootElement = rootRef.current

      if (!rootElement || pausedRef.current) return

      if (ignoreNextFocus.current) {
        ignoreNextFocus.current = false
        return
      }

      // The focus is already inside
      if (rootElement.contains(document.activeElement)) return

      if (
        document.activeElement !== sentinelEndRef.current &&
        document.activeElement !== sentinelStartRef.current
      ) {
        return
      }

      const tabbable: ReadonlyArray<HTMLElement> = getTabbable(rootElement)

      // one of the sentinel nodes was focused, so move the focus
      // to the first/last tabbable element inside the focus trap.
      if (tabbable.length && lastKeydownRef.current) {
        const shiftPressed =
          lastKeydownRef.current.key === 'Tab' &&
          lastKeydownRef.current.shiftKey
        const focusNext = tabbable[0]
        const focusPrevious = tabbable[tabbable.length - 1]
        if (shiftPressed) {
          focusPrevious.focus()
        } else {
          focusNext.focus()
        }
      } else {
        // no tabbable elements in the trap focus
        rootElement.focus()
      }
    }

    const removeFocusEventListener = addEventListener(
      document.body,
      'focus',
      trapFocus,
      true,
    )

    const removeKeydownEventListener = addEventListener(
      document.body,
      'keydown',
      (e: KeyboardEvent) => {
        lastKeydownRef.current = e
      },
      true,
    )

    return () => {
      removeFocusEventListener()
      removeKeydownEventListener()
    }
  }, [active, pausedRef])

  if (!isValidElement(children)) {
    return null
  }

  if (__DEV__ && children.type === Fragment) {
    console.error(
      '[Nex UI] FocusTrap: FocusTrap cannot use a Fragment as its child container.',
    )
    return null
  }

  const handleFocus = (e: FocusEvent) => {
    if (restoredNode.current === null) {
      restoredNode.current = e.relatedTarget
    }

    const childrenPropsHandler = children.props.onFocus
    if (childrenPropsHandler) {
      childrenPropsHandler(e)
    }
  }

  return (
    <>
      <div tabIndex={active && !paused ? 0 : -1} ref={sentinelStartRef} />
      {cloneElement(children, {
        ...children.props,
        ref: mergedRefs,
        onFocus: handleFocus,
      })}
      <div tabIndex={active && !paused ? 0 : -1} ref={sentinelEndRef} />
    </>
  )
}

FocusTrap.displayName = 'FocusTrap'
