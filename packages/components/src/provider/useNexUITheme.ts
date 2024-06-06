import { useContext } from 'react'
import type { ComponentKey, ComponentTokens } from './types'
import { ThemeContext } from './NexUIProvider'

export function useNexUITheme(): Partial<ComponentTokens>
export function useNexUITheme(
  componentKey: ComponentKey,
): ComponentTokens[ComponentKey]
export function useNexUITheme(componentKey?: ComponentKey) {
  const theme = useContext(ThemeContext)

  if (!theme) {
    return undefined
  }

  if (componentKey) {
    return theme[componentKey]
  }

  return theme!
}
