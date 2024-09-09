import type { BasicTheme, ComponentsTheme } from './types'

export function defineBasicTheme<T extends BasicTheme>(theme: T): T {
  return theme
}

export function defineComponentsTheme<T extends ComponentsTheme>(theme: T) {
  return theme
}
