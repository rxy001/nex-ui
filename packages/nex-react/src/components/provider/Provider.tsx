import { merge } from '@nex-ui/utils'
import { CSSSystemProvider, useCSSSystem } from '@nex-ui/system'
import { defaultConfig } from '@theme'
import { useMemo } from 'react'
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
  const { theme = {}, prefix = 'nexui', children } = props

  const { components, ...sysConfig } = theme

  const mergedSysConfig = useMemo(
    () => merge({ cssVarsPrefix: prefix }, defaultConfig, sysConfig),
    [prefix, sysConfig],
  )

  return (
    <CSSSystemProvider config={mergedSysConfig}>
      <InnerProvider components={components} prefix={prefix}>
        {children}
      </InnerProvider>
    </CSSSystemProvider>
  )
}
