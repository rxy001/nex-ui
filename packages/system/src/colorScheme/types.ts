import type { ReactNode } from 'react'

export type Mode = 'light' | 'dark' | 'system'
export type ColorScheme = Exclude<Mode, 'system'>

export interface State {
  mode?: Mode
  systemColorScheme?: ColorScheme
}

export interface ColorSchemeProviderProps {
  children?: ReactNode
  forcedMode?: Mode
  defaultMode?: Mode
  modeStorageKey?: string
  colorSchemeSelector?: 'data' | 'class' | (string & {})
  colorSchemeNode?: Element
}

export interface InitColorSchemeScriptProps
  extends Pick<
    ColorSchemeProviderProps,
    'modeStorageKey' | 'colorSchemeSelector' | 'defaultMode' | 'forcedMode'
  > {
  colorSchemeNode?: string
}
