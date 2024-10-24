import { createContext } from '@nex-ui/utils'

type Mode = 'light' | 'dark' | 'system'
export type ColorSchemeContext = {
  mode?: Mode
  allColorSchemes?: string[]
  setMode: (mode: Mode | null) => void
}

const [InnerColorSchemeProvider, useColorScheme] =
  createContext<ColorSchemeContext>({
    contextName: 'ColorSchemeContext',
    providerName: 'InnerColorSchemeProvider',
    hookName: 'useSystem',
    strict: false,
    defaultValue: {
      allColorSchemes: [],
      colorScheme: undefined,
      darkColorScheme: undefined,
      lightColorScheme: undefined,
      mode: undefined,
      setColorScheme: () => {},
      setMode: () => {},
      systemMode: undefined,
    },
  })

export { InnerColorSchemeProvider, useColorScheme }
