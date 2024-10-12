'use client'

import { merge } from '@nex-ui/utils'
import { CSSSystemProvider, useCSSSystem } from '@nex-ui/system'
import { useMemo } from 'react'
import { __NEX_ICON_PROVIDER as NexIconsProvider } from '@nex-ui/icons'
import { defaultConfig } from '../../theme'
import { NexContextProvider } from './Context'
import { createIcon } from '../icon/createIcon'
import type { NexProviderProps, InnerProviderProps } from './types'

function InnerProvider({ components, prefix, children }: InnerProviderProps) {
  const { cva, css, sva } = useCSSSystem()

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
    prefix = 'nui',
    children,
  } = props

  const mergedSysConfig = useMemo(
    () => merge({ cssVarsPrefix: prefix }, defaultConfig, config),
    [prefix, config],
  )

  return (
    <CSSSystemProvider config={mergedSysConfig}>
      <InnerProvider components={components} prefix={prefix}>
        <NexIconsProvider createIcon={createIcon}>{children}</NexIconsProvider>
      </InnerProvider>
    </CSSSystemProvider>
  )
}
