import type { RefObject } from 'react'

export interface UseFocusTrapProps<
  R extends HTMLElement | null = HTMLElement | null,
> {
  /**
   * When `true`, focus cannot escape the focus scope via keyboard,
   * pointer, or a programmatic focus.
   */
  active?: boolean

  /**
   * To pause or unpause the trap while it's `active`.
   */
  paused?: boolean

  /**
   * If true, the modal will restore focus to previously focused element once the modal is hidden or unmounted.
   *
   * @default true
   */
  restoreFocus?: boolean

  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tabbable.
   *
   * @default true
   */
  loop?: boolean

  ref: RefObject<R>
}
