/* istanbul ignore file */

'use client'

import { useFocusRing as useFocus } from '@react-aria/focus'
import type { DOMAttributes } from 'react'

export interface AriaFocusRingResult {
  /** Whether the element is currently focused. */
  focused: boolean

  /** Whether keyboard focus should be visible. */
  focusVisible: boolean

  /** Props to apply to the container element with the focus ring. */
  focusProps: DOMAttributes<Element>
}

export interface AriaFocusRingProps {
  /**
   * Whether to show the focus ring when something
   * inside the container element has focus (true), or
   * only if the container itself has focus (false).
   * @default 'false'
   */
  within?: boolean

  /** Whether the element is a input. */
  input?: boolean

  /** Whether the element will be auto focused. */
  autoFocus?: boolean
}

/**
 * Provides a hook to manage and determine focus ring visibility for accessibility.
 *
 * This hook wraps `@react-aria/focus`'s `useFocusRing` and returns focus state and props
 * to apply to a container element for accessible focus styling.
 *
 * @param props - Configuration options for focus ring behavior.
 * @returns An object containing focus state and props for the focus ring.
 *
 * @example
 * ```tsx
 * const { focusProps, focused, focusVisible } = useFocusRing({ within: true });
 * return <div {...focusProps} className={focusVisible ? 'ring' : ''}>...</div>;
 * ```
 */
export const useFocusRing = (
  props?: AriaFocusRingProps,
): AriaFocusRingResult => {
  const { isFocusVisible, isFocused, focusProps } = useFocus(props)

  return {
    focusProps,
    focused: isFocused,
    focusVisible: isFocusVisible,
  }
}
