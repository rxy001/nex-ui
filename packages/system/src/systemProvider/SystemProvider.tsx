import { useMemo } from 'react'
import { Global } from '@emotion/react'
import { merge } from '@nex-ui/utils'
import { createSystem } from '../system'
import { InnerSystemProvider } from './SystemContext'
import {
  ColorSchemeProvider,
  createGetColorSchemeSelector,
} from '../colorScheme'
import type { ConditionKey } from '../tokens'
import type { Dictionary } from '../types'
import type { SystemProviderProps } from './types'

export const SystemProvider = ({
  children,
  cssVarsPrefix,
  aliases,
  tokens,
  semanticTokens,
  scales,
  breakpoints,
  selectors,
  colorSchemeNode,
  forcedMode,
  defaultMode = 'system',
  modeStorageKey = 'color-scheme',
  colorSchemeSelector = 'data',
}: SystemProviderProps) => {
  const getColorSchemeSelector = useMemo(
    () => createGetColorSchemeSelector(colorSchemeSelector),
    [colorSchemeSelector],
  )

  const { css, getGlobalCssVars } = useMemo(() => {
    return createSystem({
      cssVarsPrefix,
      aliases,
      tokens,
      semanticTokens,
      scales,
      breakpoints,
      selectors: {
        ...selectors,
        dark: getColorSchemeSelector('dark'),
        light: getColorSchemeSelector('light'),
      },
    })
  }, [
    aliases,
    breakpoints,
    cssVarsPrefix,
    getColorSchemeSelector,
    scales,
    selectors,
    semanticTokens,
    tokens,
  ])

  const globalStyles = useMemo(() => {
    const cssVarMap = getGlobalCssVars()
    const result: Dictionary = {}

    cssVarMap.forEach((value, key: ConditionKey) => {
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

  const methods = useMemo(() => ({ css }), [css])

  return (
    <InnerSystemProvider value={methods}>
      <ColorSchemeProvider
        forcedMode={forcedMode}
        defaultMode={defaultMode}
        modeStorageKey={modeStorageKey}
        colorSchemeSelector={colorSchemeSelector}
        colorSchemeNode={colorSchemeNode}
      >
        <Global styles={globalStyles} />
        {children}
      </ColorSchemeProvider>
    </InnerSystemProvider>
  )
}

SystemProvider.displayName = 'SystemProvider'
