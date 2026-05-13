import type { ReactElement } from 'react'

export interface ListNavigationProps {
  children: ReactElement<{}>

  onTypingChange?: (value: boolean) => void

  orientation?: 'vertical' | 'horizontal' | 'both'

  loop?: boolean

  active?: boolean

  activeId?: string

  onActiveIdChange?: (id: string) => void
}

export interface ListNavigationProviderProps {
  children: ReactElement<{}>
}

export interface ListNavigationItemProps {
  children: ReactElement<{}>

  id?: string

  textValue?: string

  disabled?: boolean
}

export interface ListNavigationTriggerProps {
  children: ReactElement<{}>
}
