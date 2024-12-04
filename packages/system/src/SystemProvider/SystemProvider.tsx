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
  defaultMode = 'system',
  modeStorageKey = 'color-scheme',
  colorSchemeSelector = 'data',
  ...config
}: SystemProviderProps) => {
  const getColorSchemeSelector = useMemo(
    () => createGetColorSchemeSelector(colorSchemeSelector),
    [colorSchemeSelector],
  )

  // eslint-disable-next-line no-param-reassign
  config.selectors = {
    dark: getColorSchemeSelector('dark'),
    light: getColorSchemeSelector('light'),
    ...config.selectors,
  }

  const { cva, css, sva, getGlobalCssVars } = createSystem(config)

  const globalStyles = useMemo(() => {
    if (!getGlobalCssVars) {
      return null
    }

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

  const methods = useMemo(() => ({ cva, css, sva }), [cva, sva, css])

  return (
    <InnerSystemProvider value={methods}>
      <ColorSchemeProvider
        defaultMode={defaultMode}
        modeStorageKey={modeStorageKey}
        colorSchemeSelector={colorSchemeSelector}
      >
        <Global styles={globalStyles} />
        {children}
      </ColorSchemeProvider>
    </InnerSystemProvider>
  )
}

SystemProvider.displayName = 'SystemProvider'
