import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { IconsProvider } from './Context'
import type { IconsContext } from './Context'

export interface NexIconsProviderProps extends IconsContext {
  children?: ReactNode
}

export const NexIconsProvider = (props: NexIconsProviderProps) => {
  const { createIcon, children } = props

  const value = useMemo(
    () => ({
      createIcon,
    }),
    [createIcon],
  )

  return <IconsProvider value={value}>{children}</IconsProvider>
}
