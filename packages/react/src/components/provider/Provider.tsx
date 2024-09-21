'use client'

import { merge } from '@nex-ui/utils'
import { CSSSystemProvider, useCSSSystem } from '@nex-ui/system'
import { useMemo } from 'react'
import { __NEX_ICON_PROVIDER as NexIconsProvider } from '@nex-ui/icons'
import { defaultTheme } from '../../theme'
import { NexContextProvider } from './Context'
import { createIcon } from '../icon/createIcon'
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
  const { theme = {}, components, prefix = 'nui', children } = props

  const mergedSysConfig = useMemo(
    () => merge({ cssVarsPrefix: prefix }, defaultTheme, theme),
    [prefix, theme],
  )

  return (
    <CSSSystemProvider config={mergedSysConfig}>
      <InnerProvider components={components} prefix={prefix}>
        <NexIconsProvider createIcon={createIcon}>{children}</NexIconsProvider>
      </InnerProvider>
    </CSSSystemProvider>
  )
}
