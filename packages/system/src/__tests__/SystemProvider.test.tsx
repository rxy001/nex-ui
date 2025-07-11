import { fireEvent, render } from '@testing-library/react'
import { SystemProvider } from '../systemProvider'
import { ColorSchemeProviderProps, Mode, useColorScheme } from '../index'

type Listener = (event: { matches: boolean }) => void

const lightColorScheme = {
  mode: 'light',
  systemColorScheme: undefined,
  resolvedColorScheme: 'light',
}

const darkColorScheme = {
  mode: 'dark',
  systemColorScheme: undefined,
  resolvedColorScheme: 'dark',
}

const systemLightColorScheme = {
  mode: 'system',
  systemColorScheme: 'light',
  resolvedColorScheme: 'light',
}

const systemDarkColorScheme = {
  mode: 'system',
  systemColorScheme: 'dark',
  resolvedColorScheme: 'dark',
}

let setMatches: (newMatches: boolean) => void
function createMatchMedia(defaultMatches: boolean) {
  let matches = defaultMatches
  const listeners: Array<Listener> = []

  setMatches = (newMatches: boolean) => {
    matches = newMatches
    listeners.forEach((listener) => listener({ matches }))
  }

  return () => ({
    matches,
    addEventListener: (_: string, listener: Listener) => {
      listeners.push(listener)
    },
    removeEventListener: (_: string, listener: Listener) => {
      listeners.splice(
        listeners.findIndex((l) => l === listener),
        1,
      )
    },
  })
}

describe('SystemProvider', () => {
  describe('colorScheme', () => {
    afterEach(() => {
      window.localStorage.clear()
    })

    function testColorScheme(props: ColorSchemeProviderProps) {
      let mode: Mode | undefined = props.defaultMode
      const Text = () => {
        const { setMode, ...colorScheme } = useColorScheme()
        return (
          <>
            <button data-testid='switch-button' onClick={() => setMode(mode)}>
              switch
            </button>
            <div data-testid='color-scheme'>{JSON.stringify(colorScheme)}</div>
          </>
        )
      }

      const { getByTestId, rerender } = render(
        <SystemProvider {...props}>
          <Text />
        </SystemProvider>,
      )

      return {
        rerender: (newProps?: ColorSchemeProviderProps) => {
          rerender(
            <SystemProvider {...props} {...newProps}>
              <Text />
            </SystemProvider>,
          )
        },
        setMode: (newMode?: Mode) => {
          mode = newMode
          fireEvent.click(getByTestId('switch-button'))
        },
        getContent: () => JSON.parse(getByTestId('color-scheme').textContent!),
      }
    }

    it('default mode: system with prefers-color-scheme: light', () => {
      const originalMatchMedia = window.matchMedia

      // @ts-expect-error
      window.matchMedia = createMatchMedia(false)
      const { getContent } = testColorScheme({
        defaultMode: 'system',
      })
      expect(getContent()).toEqual(systemLightColorScheme)

      window.matchMedia = originalMatchMedia
    })

    it('default mode: system with prefers-color-scheme: dark', () => {
      const originalMatchMedia = window.matchMedia
      // @ts-expect-error
      window.matchMedia = createMatchMedia(true)

      const { getContent } = testColorScheme({
        defaultMode: 'system',
      })

      expect(getContent()).toEqual(systemDarkColorScheme)

      window.matchMedia = originalMatchMedia
    })

    it('should update color scheme on prefers-color-scheme change', () => {
      const originalMatchMedia = window.matchMedia
      // @ts-expect-error
      window.matchMedia = createMatchMedia(false)

      const { getContent, rerender } = testColorScheme({
        defaultMode: 'system',
      })

      expect(getContent()).toEqual(systemLightColorScheme)

      setMatches(true)
      rerender()
      expect(getContent()).toEqual(systemDarkColorScheme)

      setMatches(false)
      rerender()
      expect(getContent()).toEqual(systemLightColorScheme)

      // simulate repeated changes to ensure coverage
      setMatches(false)
      rerender()
      expect(getContent()).toEqual(systemLightColorScheme)

      window.matchMedia = originalMatchMedia
    })

    it('default mode: light', () => {
      const { getContent } = testColorScheme({
        defaultMode: 'light',
      })

      expect(getContent()).toEqual(lightColorScheme)
    })

    it('default mode: dark', () => {
      const { getContent } = testColorScheme({
        defaultMode: 'dark',
      })
      expect(getContent()).toEqual(darkColorScheme)
    })

    it('should update mode', () => {
      const originalMatchMedia = window.matchMedia
      // @ts-expect-error
      window.matchMedia = createMatchMedia(false)

      const { getContent, setMode } = testColorScheme({
        defaultMode: 'system',
      })

      expect(getContent()).toEqual(systemLightColorScheme)

      setMode('light')
      expect(getContent()).toEqual(lightColorScheme)

      setMode('dark')
      expect(getContent()).toEqual(darkColorScheme)

      // simulate repeated changes to ensure coverage
      setMode('dark')
      expect(getContent()).toEqual(darkColorScheme)

      window.matchMedia = originalMatchMedia
    })

    it('resets mode to default', () => {
      const { getContent, setMode } = testColorScheme({
        defaultMode: 'light',
      })

      expect(getContent()).toEqual(lightColorScheme)

      setMode('dark')
      expect(getContent()).toEqual(darkColorScheme)

      setMode()

      expect(getContent()).toEqual(lightColorScheme)
    })

    it('should persist mode in localStorage', () => {
      render(<SystemProvider defaultMode='light' />)

      const { getContent } = testColorScheme({
        defaultMode: 'dark',
      })

      expect(getContent()).toEqual(lightColorScheme)
    })

    it('should not update mode when forced mode is set', () => {
      const { getContent, setMode } = testColorScheme({
        forcedMode: 'dark',
      })

      expect(getContent()).toEqual(darkColorScheme)

      setMode('light')

      expect(getContent()).toEqual(darkColorScheme)

      setMode('system')

      expect(getContent()).toEqual(darkColorScheme)
    })

    it('default colorSchemeSelector: data', () => {
      testColorScheme({
        colorSchemeSelector: 'data',
        defaultMode: 'light',
      })

      expect(document.documentElement.dataset.colorScheme).toBe('light')
    })

    it('default colorSchemeSelector: custom attr', () => {
      const { rerender } = testColorScheme({
        colorSchemeSelector: 'data-nui-color-scheme',
        defaultMode: 'light',
      })

      expect(document.documentElement.dataset.nuiColorScheme).toBe('light')

      rerender({
        colorSchemeSelector: 'color-scheme',
      })

      expect(document.documentElement.getAttribute('color-scheme')).toBe(
        'light',
      )
    })

    it('default colorSchemeSelector: class', () => {
      testColorScheme({
        colorSchemeSelector: 'class',
        defaultMode: 'light',
      })

      expect(document.documentElement.classList.contains('light')).toBe(true)
    })
  })
})
