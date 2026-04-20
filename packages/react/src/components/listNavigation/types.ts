import type { ReactElement } from 'react'
import type { ListNavigationItemData } from './Collection'
import type { CollectionItemData } from '../collection'

export interface ListNavigationProps {
  children: ReactElement<{}>

  orientation?: 'vertical' | 'horizontal' | 'both'

  loop?: boolean

  initialFocusIntent?: 'first' | 'last'

  getInitialFocusElement?: (
    items: CollectionItemData<ListNavigationItemData>[],
  ) => HTMLElement | null | undefined

  onTypingChange?: (value: boolean) => void
}

export interface ListNavigationItemProps {
  children: ReactElement<{}>

  id?: string

  textValue?: string

  disabled?: boolean
}
