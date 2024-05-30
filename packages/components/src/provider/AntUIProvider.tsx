import { createContext, useMemo } from 'react'
// import { setElementVars, globalTokens } from '@wui/theme'
import type { AntUIProviderProps } from './types'

export const ThemeContext = createContext<AntUIProviderProps['theme']>({})

export function AntUIProvider(props: AntUIProviderProps) {
  const { theme, children } = props

  const themeCOntextValue = useMemo(() => theme, [theme])

  // useEffect(() => {
  //   const html = document.getElementsByTagName('html')
  //   setElementVars(html[0], {
  //     [globalTokens.colorPrimary]: 'blue',
  //   })
  // }, [])

  return (
    <ThemeContext.Provider value={themeCOntextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
