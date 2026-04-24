import type { ReactElement, Ref } from 'react'

export interface CompositeProps<T extends string | number = string> {
  activeId?: T

  defaultActiveId?: T

  onActiveIdChange?: (activeId: T) => void

  children: ReactElement<{}>

  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: 'horizontal' | 'vertical' | 'both'

  /**
   * If true, keyboard navigation loops around.
   *
   * @default false
   */
  loop?: boolean

  virtualFocus?: boolean
}

export interface CompositeItemProps<T extends string | number = string> {
  id?: T

  disabled?: boolean

  children?: ReactElement<{
    ref?: Ref<HTMLElement>
  }>
}
