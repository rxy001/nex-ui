import { createContext, useMemo } from 'react'
// import { setElementVars, globalTokens } from '@nex-ui/theme'
import type { NexUIProviderProps } from './types'

export const ThemeContext = createContext<NexUIProviderProps['theme']>({})

export const ConfigContext = createContext<Pick<NexUIProviderProps, 'prefix'>>({
  prefix: 'nexui',
})

export function NexUIProvider(props: NexUIProviderProps) {
  const { theme, children, prefix } = props

  const configContextValue = useMemo(
    () => ({
      prefix,
    }),
    [prefix],
  )
  const themeCOntextValue = useMemo(() => theme, [theme])

  // useEffect(() => {
  //   const html = document.getElementsByTagName('html')
  //   setElementVars(html[0], {
  //     [globalTokens.colorPrimary]: 'blue',
  //   })
  // }, [])

  return (
    <ConfigContext.Provider value={configContextValue}>
      <ThemeContext.Provider value={themeCOntextValue}>
        {children}
      </ThemeContext.Provider>
    </ConfigContext.Provider>
  )
}
