import { createContext } from '@nex-ui/utils'
import type { SystemColorScheme, Mode } from './types'

export type ColorSchemeContext = {
  mode?: Mode
  setMode: (mode?: Mode) => void
  systemColorScheme?: SystemColorScheme
}

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
