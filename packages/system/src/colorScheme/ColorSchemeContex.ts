'use client'

import { createContext } from '@nex-ui/utils'
import type { Mode, ColorScheme } from './types'

export interface ColorSchemeContextValue {
  mode?: Mode
  setMode: (mode?: Mode) => void
  systemColorScheme?: ColorScheme
  resolvedColorScheme?: ColorScheme
}

const [InnerColorSchemeProvider, useColorScheme] =
  createContext<ColorSchemeContextValue>({
    contextName: 'ColorSchemeContext',
    providerName: 'InnerColorSchemeProvider',
    hookName: 'useColorScheme',
    strict: true,
    defaultValue: null as unknown as ColorSchemeContextValue,
  })

export { InnerColorSchemeProvider, useColorScheme }
