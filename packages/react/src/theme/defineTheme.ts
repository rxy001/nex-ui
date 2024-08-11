import type { BasicTheme, ComponentsTheme } from './types'

// todo: 删除泛性
export function defineBasicTheme<T extends BasicTheme>(theme: T): T {
  return theme
}

export function defineComponentsTheme(theme: ComponentsTheme) {
  return theme
}
