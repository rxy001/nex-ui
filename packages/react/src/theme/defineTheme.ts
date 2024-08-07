import type { BasicTheme, ComponentTheme } from './types'

export function defineBasicTheme<T extends BasicTheme>(theme: T): T {
  return theme
}

export function defineComponentTheme<T extends ComponentTheme>(theme: T): T {
  return theme
}
