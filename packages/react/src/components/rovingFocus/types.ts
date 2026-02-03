import type { ReactElement, Ref } from 'react'

export interface RovingFocusGroupProps {
  children?: ReactElement<{}>
  focusItemId?: string
  defaultFocusItemId?: string
  onFocusItemIdChange?: (id: string) => void

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
  id?: string
  focusable?: boolean
  active?: boolean
}

export interface RovingFocusItemProps extends RovingFocusItemData {
  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
