import type { defaultConfig, Components } from './preset'

export type ThemeConfig = Partial<typeof defaultConfig> & {
  components?: Components
}

export function createTheme(theme: ThemeConfig) {
  return theme
}
