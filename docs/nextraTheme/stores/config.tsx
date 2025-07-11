'use client'

import { useFSRoute } from 'nextra/hooks'
import { normalizePages } from 'nextra/normalize-pages'
import { createContext, useContext } from 'react'
import type { FC, ReactElement, ReactNode } from 'react'
import type { PageMapItem } from 'nextra'

const ConfigContext = createContext<ReturnType<typeof normalizePages> | null>(
  null,
)

export function useConfig() {
  const normalizePagesResult = useContext(ConfigContext)
  if (!normalizePagesResult) {
    throw new Error('Missing ConfigContext.Provider')
  }
  const { activeThemeContext, activeType } = normalizePagesResult
  return {
    normalizePagesResult,
    hideSidebar: !activeThemeContext.sidebar || activeType === 'page',
  }
}

export const ConfigProvider: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
  navbar: ReactElement
}> = ({ children, pageMap, navbar }) => {
  const pathname = useFSRoute()

  const normalizedPages = normalizePages({
    list: pageMap,
    route: pathname,
  })

  const { activeThemeContext } = normalizedPages

  return (
    <ConfigContext.Provider value={normalizedPages}>
      {activeThemeContext.navbar && navbar}
      {children}
    </ConfigContext.Provider>
  )
}
