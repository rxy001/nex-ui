import { DecoratorHelpers } from '@storybook/addon-themes'
import { useColorScheme } from '@nex-ui/react'
import { useEffect } from 'react'
import type { DecoratorFunction, Renderer } from 'storybook/internal/types'

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers

export interface Configuration {
  themes: Record<string, string>
  defaultTheme: string
}

export const withTheme = <TRenderer extends Renderer = Renderer>({
  themes,
  defaultTheme,
}: Configuration): DecoratorFunction<TRenderer> => {
  initializeThemeState(Object.keys(themes), defaultTheme)

  return (story, context) => {
    const { themeOverride } = context.parameters.themes ?? {}
    const selected = pluckThemeFromContext(context)

    const { setMode } = useColorScheme()

    useEffect(() => {
      const selectedThemeName = themeOverride || selected || defaultTheme
      setMode(selectedThemeName)
    }, [selected, setMode, themeOverride])

    return story()
  }
}
