import type { ReactElement, Ref, FocusEventHandler } from 'react'

export interface FocusTrapProps {
  children: ReactElement<{ ref?: Ref<any>; onFocus?: FocusEventHandler }>

  active?: boolean

  /**
   * To pause or unpause the trap while it's `active`.
   */
  paused?: boolean

  /**
   * If true, the modal will restore focus to previously focused element once the modal is hidden or unmounted.
   * @default true
   */
  restoreFocus?: boolean
}
