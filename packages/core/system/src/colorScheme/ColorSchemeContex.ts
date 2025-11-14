'use client'

import { createContext } from '@nex-ui/utils'
import type { ColorSchemeContext } from './types'

const [InnerColorSchemeProvider, useColorScheme] =
  createContext<ColorSchemeContext>({
    contextName: 'ColorSchemeContext',
    providerName: 'InnerColorSchemeProvider',
    hookName: 'useColorScheme',
    strict: true,
    defaultValue: null as unknown as ColorSchemeContext,
  })

export { InnerColorSchemeProvider, useColorScheme }
