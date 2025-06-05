'use client'

import { createContext, createElement, useContext } from 'react'
import type { ComponentProps } from 'react'
import type { ThemeConfigProps } from '../layout'

const ThemeConfigContext = createContext<
  Omit<ThemeConfigProps, 'navbar' | 'pageMap' | 'nextThemes' | 'banner'>
>(null!)

export const useThemeConfig = () => useContext(ThemeConfigContext)

export const ThemeConfigProvider = (
  props: ComponentProps<typeof ThemeConfigContext.Provider>,
) => createElement(ThemeConfigContext.Provider, props)
