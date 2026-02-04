'use client'

import { useMenuItemIndicatorContext } from './MenuContext'
import type { MenuItemIndicatorProps } from './types'

export const MenuItemIndicator = (props: MenuItemIndicatorProps) => {
  const { children } = props

  const { checked } = useMenuItemIndicatorContext()

  if (!checked) {
    return null
  }

  return children
}

MenuItemIndicator.displayName = 'MenuItemIndicator'
