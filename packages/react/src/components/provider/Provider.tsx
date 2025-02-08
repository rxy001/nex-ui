'use client'

import { merge } from '@nex-ui/utils'
import { useSystem, SystemProvider } from '@nex-ui/system'
import { useMemo } from 'react'
import { __NEX_ICON_PROVIDER as NexIconsProvider } from '@nex-ui/icons'
import { defaultConfig } from '../../theme/preset'
import {
  NexContextProvider,
  useNexContext,
  DEFAULT_CONTEXT_VALUE,
} from './Context'
import { createIcon } from '../icon/createIcon'
import type { NexProviderProps, InnerProviderProps } from './types'

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

function TopLevelProvider(props: NexProviderProps) {
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

function NestedProvider(props: NexProviderProps) {
  const { theme: { components } = {}, children, primaryColor } = props

  const ctx = useNexContext()

  const mergedComponents = useMemo(() => {
    return merge({}, ctx.components, components)
  }, [components, ctx.components])

  return (
    <InnerProvider
      components={mergedComponents}
      prefix={ctx.prefix}
      primaryColor={primaryColor ?? ctx.primaryColor}
    >
      {children}
    </InnerProvider>
  )
}

export function NexUIProvider(props: NexProviderProps) {
  const outer = useNexContext()

  const isTopLevel = (outer as unknown as string) === DEFAULT_CONTEXT_VALUE

  return isTopLevel ? (
    <TopLevelProvider {...props} />
  ) : (
    <NestedProvider {...props} />
  )
}

NexUIProvider.displayName = 'NexUIProvider'
