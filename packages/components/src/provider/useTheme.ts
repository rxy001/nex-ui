import { useContext } from 'react'
import type { ComponentKey, ComponentTokens } from './types'
import { ThemeContext } from './AntUIProvider'

export function useTheme(): Partial<ComponentTokens>
export function useTheme(
  componentKey: ComponentKey,
): ComponentTokens[ComponentKey]
export function useTheme(componentKey?: ComponentKey) {
  const theme = useContext(ThemeContext)

  if (!theme) {
    return undefined
  }

  if (componentKey) {
    return theme[componentKey]
  }

  return theme!
}
