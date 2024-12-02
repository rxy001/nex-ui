import { useMemo } from 'react'
import { Global } from '@emotion/react'
import { merge } from '@nex-ui/utils'
import type { ReactNode } from 'react'
import type { Noop } from '@nex-ui/utils'
import { createSystem } from '../system'
import {
  InnerSystemProvider,
  useSystem,
  DEFAULT_CONTEXT_VALUE,
} from './SystemContext'
import { useColorScheme, withColorSchemeProvider } from '../colorScheme'
import type { SystemConfig } from '../system'
import type { SystemContext } from './SystemContext'
import type { Tokens } from '../tokens'
import type { Dictionary } from '../types'

export interface SystemProviderProps {
  children?: ReactNode
  config?: SystemConfig
}

export const SystemProvider = withColorSchemeProvider(
  ({ children, config = {} }: SystemProviderProps) => {
    const outer = useSystem()

    const isTopLevel = (outer as unknown as string) === DEFAULT_CONTEXT_VALUE
    const getColorSchemeSelector: Noop =
      // @ts-ignore
      useColorScheme().__getColorSchemeSelector

    let cva: SystemContext['cva']
    let sva: SystemContext['sva']
    let css: SystemContext['css']
    let getGlobalCssVars: Tokens['getGlobalCssVars'] | null = null

    // eslint-disable-next-line no-param-reassign
    config.selectors = {
      dark: getColorSchemeSelector('dark'),
      light: getColorSchemeSelector('light'),
      ...config.selectors,
    }

    if (isTopLevel) {
      ;({ cva, css, sva, getGlobalCssVars } = createSystem(config))
    } else {
      ;({ cva, css, sva } = outer)
    }

    const methods = useMemo(() => ({ cva, css, sva }), [cva, sva, css])

    return (
      <InnerSystemProvider value={methods}>
        {isTopLevel && <GlobalStyles getGlobalCssVars={getGlobalCssVars!} />}
        {children}
      </InnerSystemProvider>
    )
  },
)

type GlobalStyleProps = {
  getGlobalCssVars: Tokens['getGlobalCssVars']
}

function GlobalStyles({ getGlobalCssVars }: GlobalStyleProps) {
  const getColorSchemeSelector: Noop =
    // @ts-ignore
    useColorScheme().__getColorSchemeSelector

  const styles = useMemo(() => {
    const cssVarMap = getGlobalCssVars()
    const result: Dictionary = {}

    cssVarMap.forEach((value, key) => {
      const cssVar = Object.fromEntries(value.entries())

      if (key === 'base') {
        merge(result, {
          ':root': cssVar,
        })
        return
      }

      merge(result, {
        [getColorSchemeSelector(key)]: {
          ':root': {
            colorScheme: key,
            ...cssVar,
          },
        },
      })
    })

    return result
  }, [getColorSchemeSelector, getGlobalCssVars])

  return <Global styles={styles} />
}

SystemProvider.displayName = 'SystemProvider'
