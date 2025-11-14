import type { ReactNode } from 'react'

export type Mode = 'light' | 'dark' | 'system'
export type ColorScheme = Exclude<Mode, 'system'>

export type State = {
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

export type ColorSchemeContext = {
  mode?: Mode
  setMode: (mode?: Mode) => void
  systemColorScheme?: ColorScheme
  resolvedColorScheme?: ColorScheme
}

export type InitColorSchemeScriptProps = Pick<
  ColorSchemeProviderProps,
  'modeStorageKey' | 'colorSchemeSelector' | 'defaultMode' | 'forcedMode'
> & {
  colorSchemeNode?: string
}
