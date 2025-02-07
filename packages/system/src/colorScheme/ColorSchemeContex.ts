'use client'

import { createContext } from '@nex-ui/utils'
import type { ColorSchemeContext } from './types'

const [InnerColorSchemeProvider, useColorScheme] =
  createContext<ColorSchemeContext>({
    contextName: 'ColorSchemeContext',
    providerName: 'InnerColorSchemeProvider',
    hookName: 'useSystem',
    strict: false,
    defaultValue: {
      mode: undefined,
      setMode: () => {},
      systemColorScheme: undefined,
    },
  })

export { InnerColorSchemeProvider, useColorScheme }
