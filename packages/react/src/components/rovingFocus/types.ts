import type { ReactElement, Ref } from 'react'

export interface RovingFocusGroupProps<T extends string | number = string> {
  children?: ReactElement<{}>
  focusItemId?: T
  defaultFocusItemId?: T
  onFocusItemIdChange?: (id: T) => void

  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * If true, keyboard navigation loops around.
   *
   * @default false
   */
  loop?: boolean
}

export interface RovingFocusItemData {
  id?: string | number
  focusable?: boolean
  active?: boolean
}

export interface RovingFocusItemProps extends RovingFocusItemData {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
