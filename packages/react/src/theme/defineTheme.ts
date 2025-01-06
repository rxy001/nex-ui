import { merge } from '@nex-ui/utils'
import type { Theme } from '../types/theme'
import { defaultConfig } from './preset'

export function defineTheme(theme: Theme) {
  return theme ? merge({}, defaultConfig as Theme, theme) : theme
}
