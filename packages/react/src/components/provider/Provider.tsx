'use client'

import { merge } from '@nex-ui/utils'
import { CSSSystemProvider, useCSSSystem } from '@nex-ui/system'
import { useMemo } from 'react'
import { defaultTheme } from '../../theme'
import { NexContextProvider } from './Context'
import type { NexProviderProps, InnerProviderProps } from './types'

function InnerProvider({ components, prefix, children }: InnerProviderProps) {
  const { styles, normalize } = useCSSSystem()

  const contextValue = useMemo(
    () => ({ components, prefix, styles, normalize }),
    [components, normalize, prefix, styles],
  )
  return (
    <NexContextProvider value={contextValue}>{children}</NexContextProvider>
  )
}

export function NexProvider(props: NexProviderProps) {
  const { theme = {}, components, prefix = 'nex', children } = props

  const mergedSysConfig = useMemo(
    () => merge({ cssVarsPrefix: prefix }, defaultTheme, theme),
    [prefix, theme],
  )

  return (
    <CSSSystemProvider config={mergedSysConfig}>
      <InnerProvider components={components} prefix={prefix}>
        {children}
      </InnerProvider>
    </CSSSystemProvider>
  )
}
