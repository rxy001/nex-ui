import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Global } from '@emotion/react'
import type { Interpolation } from '@emotion/react'
import { createSystem } from '../system'
import {
  InnerSystemProvider,
  useSystem,
  DEFAULT_CONTEXT_VALUE,
} from './SystemContext'
import type { SystemConfig } from '../system'
import type { SystemContext } from './SystemContext'

export type SystemProviderProps = {
  children?: ReactNode
  config?: SystemConfig
}

export const SystemProvider = ({
  config = {},
  children,
}: SystemProviderProps) => {
  const outer = useSystem()

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
    <InnerSystemProvider value={methods}>
      {isTopLevel && <Global styles={globalCssVars} />}
      {children}
    </InnerSystemProvider>
  )
}

SystemProvider.displayName = 'SystemProvider'
