'use client'

import { useSystem, SystemProvider, mergeRecipeConfigs } from '@nex-ui/system'
import { useMemo } from 'react'
import { mergeWith } from '@nex-ui/utils'
import { defaultConfig } from '../../theme/preset'
import { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE } from './Context'
import type { NexUIProviderProps, InnerProviderProps } from './types'
import type { SystemProviderProps } from '@nex-ui/system'

function InnerProvider({
  components,
  prefix,
  children,
  primaryThemeColor = 'blue',
}: InnerProviderProps) {
  const { css } = useSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, css, primaryThemeColor }),
    [components, css, prefix, primaryThemeColor],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

function TopLevelProvider(props: NexUIProviderProps) {
  const { theme, children, colorScheme, prefix = 'nui' } = props

  const systemProviderProps = useMemo<SystemProviderProps>(() => {
    return {
      cssVarsPrefix: prefix,
      scales: theme?.scales ?? defaultConfig.scales,
      selectors: theme?.selectors ?? defaultConfig.selectors,
      aliases: theme?.aliases ?? defaultConfig.aliases,
      tokens: theme?.tokens ?? defaultConfig.tokens,
      semanticTokens: theme?.semanticTokens ?? defaultConfig.semanticTokens,
      breakpoints: theme?.breakpoints ?? defaultConfig.breakpoints,
      colorSchemeNode: colorScheme?.colorSchemeNode,
      modeStorageKey: colorScheme?.modeStorageKey ?? `${prefix}-color-scheme`,
      colorSchemeSelector:
        colorScheme?.colorSchemeSelector ?? `data-${prefix}-color-scheme`,
      defaultMode: colorScheme?.defaultMode ?? 'system',
      forcedMode: colorScheme?.forcedMode,
    }
  }, [
    prefix,
    theme?.scales,
    theme?.selectors,
    theme?.aliases,
    theme?.tokens,
    theme?.semanticTokens,
    theme?.breakpoints,
    colorScheme,
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
          return {
            ...target,
            ...source,
          }
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
