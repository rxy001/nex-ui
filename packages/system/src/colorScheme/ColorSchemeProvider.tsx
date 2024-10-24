import type { ReactNode } from 'react'
import { InnerColorSchemeProvider } from './ColorSchemeContex'

interface ColorSchemeProviderProps {
  children?: ReactNode
  modeStorageKey?: string
  colorSchemeStorageKey?: string
  defaultColorScheme?: string | { light: string; dark: string }
  colorSchemes?: {
    light?: boolean
  }
}

export const ColorSchemeProvider = ({
  children,
  colorSchemes,
  modeStorageKey = 'mode',
  colorSchemeStorageKey = 'color-scheme',
  defaultColorScheme = {
    light: 'light',
    dark: 'dark',
  },
}: ColorSchemeProviderProps) => {
  return (
    <InnerColorSchemeProvider value={{}}>{children}</InnerColorSchemeProvider>
  )
}
