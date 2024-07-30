import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Global } from '@emotion/react'
import { createSystem } from '../system'
import { SystemProvider } from './Context'
import type { SystemConfig } from '../types'

export type CSSSystemProviderProps = {
  children: ReactNode
  config?: SystemConfig
}

export const CSSSystemProvider = ({
  config = {},
  children,
}: CSSSystemProviderProps) => {
  const { styles, globalCssVars, normalize } = createSystem(config)

  const methods = useMemo(() => ({ styles, normalize }), [styles, normalize])

  return (
    <SystemProvider value={methods}>
      <Global styles={globalCssVars} />
      {children}
    </SystemProvider>
  )
}
