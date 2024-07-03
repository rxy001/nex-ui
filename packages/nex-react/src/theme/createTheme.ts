import type { defaultConfig } from './preset'

export type ThemeConfig = Partial<typeof defaultConfig> & {
  components?: {
    button: any
  }
}

export function createTheme(theme: ThemeConfig) {
  return theme
}
