import { merge } from '@nex-ui/utils'
import type { Theme } from '../types/theme'
import { defaultConfig } from './preset'

export function defineTheme(theme: Theme): Theme {
  return theme ? merge({}, defaultConfig, theme) : theme
}
