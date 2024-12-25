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

function InnerProvider({ components, prefix, children }: InnerProviderProps) {
  const { css } = useSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, css }),
    [components, css, prefix],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

function TopLevelProvider(props: NexProviderProps) {
  const {
    children,
    theme = {},
    prefix = 'nui',
    defaultMode = 'system',
    modeStorageKey = 'nui-color-scheme',
    colorSchemeSelector = 'data-nui-color-scheme',
  } = props

  const mergedSysConfig = useMemo(() => {
    const { components: _components, ...config } = theme
    return merge({ cssVarsPrefix: prefix }, defaultConfig, config)
  }, [prefix, theme])

  return (
    <SystemProvider
      modeStorageKey={modeStorageKey}
      colorSchemeSelector={colorSchemeSelector}
      defaultMode={defaultMode}
      {...mergedSysConfig}
    >
      <NexIconsProvider createIcon={createIcon}>
        <InnerProvider components={theme.components} prefix={prefix}>
          {children}
        </InnerProvider>
      </NexIconsProvider>
    </SystemProvider>
  )
}

function NestedProvider(props: NexProviderProps) {
  const { theme: { components } = {}, children } = props

  const ctx = useNexContext()

  const mergedComponents = useMemo(() => {
    return merge({}, ctx.components, components)
  }, [components, ctx.components])

  return (
    <InnerProvider components={mergedComponents} prefix={ctx.prefix}>
      {children}
    </InnerProvider>
  )
}

export function NexProvider(props: NexProviderProps) {
  const outer = useNexContext()

  const isTopLevel = (outer as unknown as string) === DEFAULT_CONTEXT_VALUE

  return isTopLevel ? (
    <TopLevelProvider {...props} />
  ) : (
    <NestedProvider {...props} />
  )
}

NexProvider.displayName = 'NexProvider'
