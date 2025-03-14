'use client'

import { useSystem, SystemProvider, mergeRecipeConfigs } from '@nex-ui/system'
import { useMemo } from 'react'
import { mergeWith } from '@nex-ui/utils'
import { defaultConfig } from '../../theme/preset'
import { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE } from './Context'
import type { NexUIProviderProps, InnerProviderProps } from './types'

function InnerProvider({
  components,
  prefix,
  children,
  primaryColor,
}: InnerProviderProps) {
  const { css } = useSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, css, primaryColor }),
    [components, css, prefix, primaryColor],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

function TopLevelProvider(props: NexUIProviderProps) {
  const {
    theme,
    children,
    colorSchemeNode,
    primaryColor = 'blue',
    prefix = 'nui',
    defaultMode = 'system',
    modeStorageKey = `${prefix}-color-scheme`,
    colorSchemeSelector = `data-${prefix}-color-scheme`,
  } = props

  const mergedSysConfig = useMemo(() => {
    return {
      cssVarsPrefix: prefix,
      ...(theme || defaultConfig),
    }
  }, [prefix, theme])

  return (
    <SystemProvider
      colorSchemeNode={colorSchemeNode}
      modeStorageKey={modeStorageKey}
      colorSchemeSelector={colorSchemeSelector}
      defaultMode={defaultMode}
      {...mergedSysConfig}
    >
      <InnerProvider
        components={theme?.components}
        primaryColor={primaryColor}
        prefix={prefix}
      >
        {children}
      </InnerProvider>
    </SystemProvider>
  )
}

function NestedProvider(props: NexUIProviderProps) {
  const { theme, children, primaryColor } = props

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
      primaryColor={primaryColor ?? ctx.primaryColor}
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
