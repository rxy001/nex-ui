'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { InnerColorSchemeProvider } from './ColorSchemeContex'
import type {
  State,
  Mode,
  SystemColorScheme,
  ColorSchemeProviderProps,
  ColorSchemeContext,
} from './types'

function initializeValue(key: string, defaultValue: string) {
  if (typeof window === 'undefined') {
    return undefined
  }
  let value
  try {
    value = localStorage.getItem(key) || undefined
    if (!value) {
      localStorage.setItem(key, defaultValue)
    }
  } catch {
    // Unsupported
  }
  return value || defaultValue
}

function getSystemColorScheme(mode?: Mode): SystemColorScheme | undefined {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    mode === 'system'
  ) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    if (mql.matches) {
      return 'dark'
    }
    return 'light'
  }
  return undefined
}

function getColorScheme(state: State) {
  if (
    state.mode === 'light' ||
    (state.mode === 'system' && state.systemColorScheme === 'light')
  ) {
    return 'light'
  }

  if (
    state.mode === 'dark' ||
    (state.mode === 'system' && state.systemColorScheme === 'dark')
  ) {
    return 'dark'
  }
  return undefined
}

export function createGetColorSchemeSelector(
  selector: ColorSchemeProviderProps['colorSchemeSelector'],
) {
  return function getColorSchemeSelector(colorScheme: SystemColorScheme) {
    if (selector === 'media') {
      return `@media (prefers-color-scheme: ${colorScheme})`
    }
    if (selector) {
      if (selector.startsWith('data-') && !selector.includes('%s')) {
        return `[${selector}="${colorScheme}"] &`
      }
      if (selector === 'class') {
        return `.${colorScheme} &`
      }
      if (selector === 'data') {
        return `[data-color-scheme=${colorScheme}] &`
      }
      return `${selector.replace('%s', colorScheme)}`
    }
    return '&'
  }
}

export const ColorSchemeProvider = ({
  children,
  colorSchemeNode,
  modeStorageKey = 'color-scheme',
  defaultMode = 'system',
  colorSchemeSelector = 'data',
}: ColorSchemeProviderProps) => {
  const [state, setState] = useState<State>(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode) as Mode
    const systemColorScheme = getSystemColorScheme(initialMode)

    return {
      mode: initialMode,
      systemColorScheme: systemColorScheme as SystemColorScheme,
    }
  })

  const isMultiSchemes = state.mode === 'system'

  const setMode = useCallback(
    (mode?: Mode) => {
      setState((currentState) => {
        if (mode === currentState.mode) {
          return currentState
        }
        const newMode = mode ?? defaultMode

        try {
          localStorage.setItem(modeStorageKey, newMode)
        } catch {
          // Unsupported
        }

        return {
          mode: newMode,
          systemColorScheme: getSystemColorScheme(newMode),
        }
      })
    },
    [defaultMode, modeStorageKey],
  )

  const handleMediaQuery = useEvent((event: MediaQueryListEvent) => {
    if (state.mode === 'system') {
      setState((currentState) => {
        const systemColorScheme = event.matches ? 'dark' : 'light'

        if (currentState.systemColorScheme === systemColorScheme) {
          return currentState
        }
        return { ...currentState, systemColorScheme }
      })
    }
  })

  useEffect(() => {
    if (
      !isMultiSchemes ||
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    media.addEventListener('change', handleMediaQuery)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery, isMultiSchemes])

  const colorScheme = getColorScheme(state)

  useEffect(() => {
    if (colorScheme && colorSchemeSelector && colorSchemeSelector !== 'media') {
      // eslint-disable-next-line prefer-destructuring
      const selector = colorSchemeSelector
      let rule = ''
      if (selector === 'class') {
        rule = `.%s`
      }
      if (selector === 'data') {
        rule = `[data-color-scheme=%s]`
      }
      if (selector?.startsWith('data-') && !selector.includes('%s')) {
        // 'data-nui-color-scheme' -> '[data-nui-color-scheme="%s"]'
        rule = `[${selector}="%s"]`
      }

      const supportedColorSchemes = ['light', 'dark']

      const node = colorSchemeNode ?? document.documentElement

      if (rule.startsWith('.')) {
        node.classList.remove(
          ...supportedColorSchemes.map((scheme) =>
            rule.substring(1).replace('%s', scheme),
          ),
        )
        node.classList.add(rule.substring(1).replace('%s', colorScheme))
      } else {
        const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/)
        if (matches) {
          const [attr, value] = matches[1].split('=')
          if (!value) {
            supportedColorSchemes.forEach((scheme) => {
              node.removeAttribute(attr.replace(colorScheme, scheme))
            })
          }
          node.setAttribute(attr, value ? value.replace(/"|'/g, '') : '')
        } else {
          node.setAttribute(rule, colorScheme)
        }
      }
    }
  }, [colorScheme, colorSchemeNode, colorSchemeSelector])

  const ctx = useMemo<ColorSchemeContext>(
    () => ({
      ...state,
      setMode,
    }),
    [state, setMode],
  )

  return (
    <InnerColorSchemeProvider value={ctx}>{children}</InnerColorSchemeProvider>
  )
}

ColorSchemeProvider.displayName = 'ColorSchemeProvider'
