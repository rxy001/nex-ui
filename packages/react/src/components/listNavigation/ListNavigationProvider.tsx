'use client'

import { useMemo, useRef } from 'react'
import { ListNavigationRootProvider } from './ListNavigationContext'
import type { ListNavigationProviderProps } from './types'

export function ListNavigationProvider({
  children,
}: ListNavigationProviderProps) {
  const keyRef = useRef<string | null>(null)
  const listRef = useRef<HTMLElement>(null)
  const ctx = useMemo(
    () => ({
      keyRef,
      listRef,
    }),
    [],
  )

  return (
    <ListNavigationRootProvider value={ctx}>
      {children}
    </ListNavigationRootProvider>
  )
}

ListNavigationProvider.displayName = 'ListNavigationProvider'
