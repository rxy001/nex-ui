import type { ReactNode } from 'react'

export type Mode = 'light' | 'dark' | 'system'
export type ColorScheme = Exclude<Mode, 'system'>
export type SystemColorScheme = ColorScheme

export type State = {
  mode?: Mode
  systemColorScheme?: SystemColorScheme
}

export interface ColorSchemeProviderProps {
  children?: ReactNode
  defaultMode?: Mode
  modeStorageKey?: string
  colorSchemeSelector?: 'data' | 'class' | (string & NonNullable<unknown>)
  colorSchemeNode?: Element
}

export type ColorSchemeContext = {
  mode?: Mode
  setMode: (mode?: Mode) => void
  systemColorScheme?: SystemColorScheme
}

export type InitColorSchemeScriptProps = Pick<
  ColorSchemeProviderProps,
  'modeStorageKey' | 'colorSchemeSelector' | 'defaultMode'
> & {
  colorSchemeNode?: string
}
