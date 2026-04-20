import type { ReactElement } from 'react'

export interface FocusTrapProps {
  children: ReactElement<{}>
  /**
   * If true, focus can't escape the focus trap via tabbing,
   * pointer, or a programmatic focus.
   *
   * @default false
   */
  active?: boolean

  /**
   * If true, restores focus to the element focused before on unmount.
   *
   * @default true
   */
  restoreFocus?: boolean

  /**
   * If true, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tabbable.
   *
   * @default true
   */
  loop?: boolean

  /**
   * If true, focuses the first tabbable element on mount.
   *
   * @default false
   */
  autoFocus?: boolean
}
