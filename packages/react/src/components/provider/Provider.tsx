'use client'

import { useSystem, SystemProvider, mergeRecipeConfigs } from '@nex-ui/system'
import { useMemo } from 'react'
import { mergeProps, merge, mergeWith } from '@nex-ui/utils'
import { defaultConfig } from '../../theme'
import { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE } from './Context'
import type { NexUIProviderProps, InnerProviderProps } from './types'
import type { SystemProviderProps } from '@nex-ui/system'

function InnerProvider({
  components,
  prefix,
  children,
  primaryThemeColor = 'blue',
}: InnerProviderProps) {
  const { css, layers } = useSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, css, layers, primaryThemeColor }),
    [components, css, layers, prefix, primaryThemeColor],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

InnerProvider.displayName = 'InnerProvider'

function TopLevelProvider(props: NexUIProviderProps) {
  const {
    theme,
    children,
    colorScheme,
    cssCascadeLayersDisabled,
    prefix = 'nui',
  } = props

  const systemProviderProps = useMemo<SystemProviderProps>(() => {
    return {
      cssCascadeLayersDisabled,
      prefix,
      scales: {
        ...theme?.scales,
        ...defaultConfig.scales,
      },
      selectors: {
        ...defaultConfig.selectors,
        ...theme?.selectors,
      },
      aliases: {
        ...theme?.aliases,
        ...defaultConfig.aliases,
      },
      breakpoints: {
        ...defaultConfig.breakpoints,
        ...theme?.breakpoints,
      },
      tokens: merge({}, defaultConfig.tokens, theme?.tokens),
      semanticTokens: merge(
        {},
        defaultConfig.semanticTokens,
        theme?.semanticTokens,
      ),
      colorSchemeNode: colorScheme?.colorSchemeNode,
      modeStorageKey: colorScheme?.modeStorageKey ?? `${prefix}-color-scheme`,
      colorSchemeSelector:
        colorScheme?.colorSchemeSelector ?? `data-${prefix}-color-scheme`,
      forcedMode: colorScheme?.forcedMode,
      defaultMode: colorScheme?.defaultMode ?? 'system',
    }
  }, [
    cssCascadeLayersDisabled,
    prefix,
    theme?.scales,
    theme?.selectors,
    theme?.aliases,
    theme?.breakpoints,
    theme?.tokens,
    theme?.semanticTokens,
    colorScheme?.colorSchemeNode,
    colorScheme?.modeStorageKey,
    colorScheme?.colorSchemeSelector,
    colorScheme?.forcedMode,
    colorScheme?.defaultMode,
  ])

  return (
    <SystemProvider {...systemProviderProps}>
      <InnerProvider
        components={theme?.components}
        primaryThemeColor={theme?.primaryThemeColor}
        prefix={prefix}
      >
        {children}
      </InnerProvider>
    </SystemProvider>
  )
}

TopLevelProvider.displayName = 'TopLevelProvider'

function NestedProvider(props: NexUIProviderProps) {
  const { theme, children } = props

  const ctx = useNexUI()

  const mergedComponents = useMemo(() => {
    return mergeWith(
      {},
      ctx.components,
      theme?.components,
      (target: any, source: any, key: string) => {
        if (key === 'styleOverrides') {
          return mergeRecipeConfigs(target, source)
        }
        if (key === 'defaultProps') {
          return mergeProps(target, source)
        }
      },
    )
  }, [theme?.components, ctx.components])

  return (
    <InnerProvider
      prefix={ctx.prefix}
      components={mergedComponents}
      primaryThemeColor={theme?.primaryThemeColor ?? ctx.primaryThemeColor}
    >
      {children}
    </InnerProvider>
  )
}

NestedProvider.displayName = 'NestedProvider'

export function NexUIProvider(props: NexUIProviderProps) {
  const outer = useNexUI()

  const isTopLevel = (outer as unknown as string) === DEFAULT_CONTEXT_VALUE

  return isTopLevel ? (
    <TopLevelProvider {...props} />
  ) : (
    <NestedProvider {...props} />
  )
}

NexUIProvider.displayName = 'NexUIProvider'
