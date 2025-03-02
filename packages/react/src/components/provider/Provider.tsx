'use client'

import { isArray, mergeWith } from '@nex-ui/utils'
import { useSystem, SystemProvider } from '@nex-ui/system'
import { useMemo } from 'react'
import { __NEX_ICON_PROVIDER as NexIconsProvider } from '@nex-ui/icons'
import { defaultConfig } from '../../theme/preset'
import { NexContextProvider, useNexUI, DEFAULT_CONTEXT_VALUE } from './Context'
import { createIcon } from '../icon/createIcon'
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
      <NexIconsProvider createIcon={createIcon}>
        <InnerProvider
          components={theme?.components}
          primaryColor={primaryColor}
          prefix={prefix}
        >
          {children}
        </InnerProvider>
      </NexIconsProvider>
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
      (value: any, srcValue: any, key: string) => {
        if (key === 'compoundVariants') {
          if (value === undefined) {
            return srcValue
          }
          if (isArray(value) && isArray(srcValue)) {
            return [...value, ...srcValue]
          }
          return value
        }
        if (isArray(value)) {
          return srcValue
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
