'use client'

import { merge } from '@nex-ui/utils'
import { useSystem, SystemProvider } from '@nex-ui/system'
import { useMemo } from 'react'
import { __NEX_ICON_PROVIDER as NexIconsProvider } from '@nex-ui/icons'
import { defaultConfig } from '../../theme/preset'
import { NexContextProvider } from './Context'
import { createIcon } from '../icon/createIcon'
import type { NexProviderProps, InnerProviderProps } from './types'

function InnerProvider({ components, prefix, children }: InnerProviderProps) {
  const { cva, css, sva } = useSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, sys: { cva, css, sva } }),
    [components, css, cva, sva, prefix],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

export function NexProvider(props: NexProviderProps) {
  const {
    theme: { components, ...config } = {},
    colorSchemeSelector,
    defaultMode,
    modeStorageKey,
    prefix = 'nui',
    children,
  } = props

  const mergedSysConfig = useMemo(
    () => merge({ cssVarsPrefix: prefix }, defaultConfig, config),
    [prefix, config],
  )

  return (
    <SystemProvider
      modeStorageKey={modeStorageKey}
      colorSchemeSelector={colorSchemeSelector}
      defaultMode={defaultMode}
      config={mergedSysConfig}
    >
      <InnerProvider components={components} prefix={prefix}>
        <NexIconsProvider createIcon={createIcon}>{children}</NexIconsProvider>
      </InnerProvider>
    </SystemProvider>
  )
}
