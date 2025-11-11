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
import type { Dictionary, Interpolation } from '../types'
import type { SystemProviderProps } from './types'

export const SystemProvider = ({
  children,
  prefix,
  cssCascadeLayersDisabled,
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

  const { css, getGlobalCssVars, layers } = useMemo(() => {
    return createSystem({
      prefix,
      aliases,
      tokens,
      semanticTokens,
      scales,
      breakpoints,
      cssCascadeLayersDisabled,
      selectors: {
        ...selectors,
        dark: getColorSchemeSelector('dark'),
        light: getColorSchemeSelector('light'),
      },
    })
  }, [
    aliases,
    breakpoints,
    prefix,
    cssCascadeLayersDisabled,
    getColorSchemeSelector,
    scales,
    selectors,
    semanticTokens,
    tokens,
  ])

  const globalStyles = useMemo(() => {
    const cssVarMap = getGlobalCssVars()
    const result: Dictionary = {
      [layers.atRules]: {},
    }

    cssVarMap.forEach((value, key: ConditionKey) => {
      const cssVar = Object.fromEntries(value.entries())

      if (key === 'base') {
        merge(
          result,
          layers.wrapWithLayer('global', {
            ':root': cssVar,
          }),
        )
        return
      }

      merge(
        result,
        layers.wrapWithLayer('global', {
          [getColorSchemeSelector(key)]: {
            ':root': {
              colorScheme: key,
              ...cssVar,
            },
          },
        }),
      )
    })

    return result
  }, [getColorSchemeSelector, getGlobalCssVars, layers])

  const methods = useMemo(
    () => ({
      css: (styles: Interpolation) => css(layers.wrapWithLayer('css', styles)),
      layers,
    }),
    [css, layers],
  )

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
