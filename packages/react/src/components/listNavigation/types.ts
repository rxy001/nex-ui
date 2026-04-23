import type { ReactElement } from 'react'

export interface ListNavigationProps {
  children: ReactElement<{}>

  orientation?: 'vertical' | 'horizontal' | 'both'

  loop?: boolean

  onTypingChange?: (value: boolean) => void

  active?: boolean

  highlightedId?: string

  defaultHighlightedId?: string

  onHighlightedChange?: (id: string) => void
}

export interface ListNavigationItemProps {
  children: ReactElement<{}>

  id?: string

  textValue?: string

  disabled?: boolean
}
