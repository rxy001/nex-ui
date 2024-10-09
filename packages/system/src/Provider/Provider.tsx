import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Global } from '@emotion/react'
import type { Interpolation } from '@emotion/react'
import { createSystem } from '../system'
import { SystemProvider, useCSSSystem, DEFAULT_CONTEXT_VALUE } from './Context'
import type { SystemConfig } from '../types'
import type { SystemContext } from './Context'

export type CSSSystemProviderProps = {
  children: ReactNode
  config?: SystemConfig
}

export const CSSSystemProvider = ({
  config = {},
  children,
}: CSSSystemProviderProps) => {
  const outer = useCSSSystem()

  const isTopLevel = (outer as unknown as string) === DEFAULT_CONTEXT_VALUE

  let cva: SystemContext['cva']
  let sva: SystemContext['sva']
  let css: SystemContext['css']
  let globalCssVars: Interpolation

  if (isTopLevel) {
    ;({ cva, css, sva, globalCssVars } = createSystem(config))
  } else {
    ;({ cva, css, sva } = outer)
  }

  const methods = useMemo(() => ({ cva, css, sva }), [cva, sva, css])

  return (
    <SystemProvider value={methods}>
      {isTopLevel && <Global styles={globalCssVars} />}
      {children}
    </SystemProvider>
  )
}
