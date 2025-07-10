import { fireEvent, render } from '@testing-library/react'
import { SystemProvider } from '../systemProvider'
import { useColorScheme } from '../colorScheme'
import type { ColorSchemeContext } from '../colorScheme/types'

describe('SystemProvider', () => {
  it('should render with default props', () => {
    let mode: ColorSchemeContext['mode']
    let setMode: ColorSchemeContext['setMode']
    let resolvedColorScheme: ColorSchemeContext['resolvedColorScheme']
    let systemColorScheme: ColorSchemeContext['systemColorScheme']

    const Text = () => {
      ;({
        mode: mode,
        setMode: setMode,
        resolvedColorScheme: resolvedColorScheme,
        systemColorScheme: systemColorScheme,
      } = useColorScheme())

      return null
    }

    const { rerender } = render(<Text />, {
      wrapper: ({ children }) => (
        <SystemProvider defaultMode='dark' colorSchemeSelector='data'>
          {children}
        </SystemProvider>
      ),
    })

    expect(mode).toBe('dark')
    expect(document.documentElement).toHaveAttribute(
      'data-color-scheme',
      'dark',
    )
    expect(resolvedColorScheme).toBe('dark')
    expect(systemColorScheme).toBe(undefined)

    // @ts-expect-error
    setMode('light')
    rerender(<Text />)
    expect(mode).toBe('light')
    expect(document.documentElement).toHaveAttribute(
      'data-color-scheme',
      'light',
    )
    expect(resolvedColorScheme).toBe('light')
    expect(systemColorScheme).toBe(undefined)
  })
})
