import { createElement } from 'react'
import type { FunctionComponent, ComponentProps } from 'react'
import { ColorSchemeProvider } from './ColorSchemeProvider'
import type { ColorSchemeProviderProps } from './types'

export const withColorSchemeProvider = <P extends FunctionComponent<any>>(
  Component: P,
): FunctionComponent<ColorSchemeProviderProps & ComponentProps<P>> => {
  return ({
    modeStorageKey = 'color-scheme',
    defaultMode = 'system',
    colorSchemeSelector = 'media',
    ...props
  }: ColorSchemeProviderProps & ComponentProps<P>) => {
    return (
      <ColorSchemeProvider
        modeStorageKey={modeStorageKey}
        defaultMode={defaultMode}
        colorSchemeSelector={colorSchemeSelector}
      >
        {createElement(Component, props)}
      </ColorSchemeProvider>
    )
  }
}
