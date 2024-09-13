import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { IconsProvider } from './Context'
import type { IconsContext } from './Context'

export interface NexIconsProviderProps extends IconsContext {
  children?: ReactNode
}

export const NexIconsProvider = (props: NexIconsProviderProps) => {
  const { children, prefix } = props

  const value = useMemo(
    () => ({
      prefix,
    }),
    [prefix],
  )

  return <IconsProvider value={value}>{children}</IconsProvider>
}
