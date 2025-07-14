import { fireEvent, render } from '@testing-library/react'
import { SystemProvider } from '../systemProvider'
import {
  ColorSchemeProviderProps,
  Mode,
  useColorScheme,
  InitColorSchemeScript,
} from '../index'
import { ColorSchemeProvider } from '../colorScheme'

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
  let originalMatchMedia: typeof window.matchMedia
  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })

  afterEach(() => {
    window.localStorage.clear()
    const html = document.documentElement
    const attrs = Array.from(html.attributes)
    attrs.forEach((attr) => html.removeAttribute(attr.name))

    window.matchMedia = originalMatchMedia
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
    // @ts-expect-error
    window.matchMedia = createMatchMedia(false)
    const { getContent } = testColorScheme({
      defaultMode: 'system',
    })
    expect(getContent()).toEqual(systemLightColorScheme)
  })

  it('default mode: system with prefers-color-scheme: dark', () => {
    // @ts-expect-error
    window.matchMedia = createMatchMedia(true)

    const { getContent } = testColorScheme({
      defaultMode: 'system',
    })

    expect(getContent()).toEqual(systemDarkColorScheme)
  })

  it('should update color scheme on prefers-color-scheme change', () => {
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

    expect(document.documentElement.getAttribute('data-nui-color-scheme')).toBe(
      'light',
    )

    rerender({
      colorSchemeSelector: 'color-scheme',
    })

    expect(document.documentElement.getAttribute('color-scheme')).toBe('light')

    rerender({
      colorSchemeSelector: '[data-mode-%s]',
    })
    expect(document.documentElement.getAttribute('data-mode-light')).toBe('')
    expect(document.documentElement.getAttribute('data-mode-dark')).toBe(null)
  })

  it('default colorSchemeSelector: class', () => {
    testColorScheme({
      colorSchemeSelector: 'class',
      defaultMode: 'light',
    })

    expect(document.documentElement).toHaveClass('light')
  })
})

describe('InitColorSchemeScript', () => {
  afterEach(() => {
    window.localStorage.clear()
    const html = document.documentElement
    const attrs = Array.from(html.attributes)
    attrs.forEach((attr) => html.removeAttribute(attr.name))
  })

  const DEFAULT_STORAGE_KEY = 'test-mode'
  const DEFAULT_COLOR_SCHEME_SELECTOR = 'data-color-scheme'
  it('should set correct color scheme to html based on system preference', () => {
    const originalMatchMedia = window.matchMedia

    // @ts-expect-error
    window.matchMedia = createMatchMedia(true)
    const { container, rerender } = render(<InitColorSchemeScript />)
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR),
    ).toBe('dark')

    // @ts-expect-error
    window.matchMedia = createMatchMedia(false)
    rerender(<InitColorSchemeScript />)
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR),
    ).toBe('light')

    window.matchMedia = originalMatchMedia
  })

  it('should set `light` color scheme to html with data', () => {
    const defaultMode = 'light'

    const { container } = render(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='data'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR),
    ).toBe(defaultMode)
  })

  it('should set `light` color scheme to html with custom attribute', () => {
    const defaultMode = 'light'

    const { container, rerender } = render(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='data-test-color-scheme'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute('data-test-color-scheme'),
    ).toBe(defaultMode)

    rerender(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='[data-mode-%s]'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement.getAttribute('data-mode-light')).toBe('')
    expect(document.documentElement.getAttribute('data-mode-dark')).toBe(null)

    rerender(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='[data-mode="%s"]'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement.getAttribute('data-mode')).toBe(defaultMode)

    rerender(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='color-scheme'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement.getAttribute('color-scheme')).toBe(
      defaultMode,
    )

    rerender(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='[data-mode="%s"]'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement.getAttribute('data-mode')).toBe(defaultMode)
  })

  it('should set `dark` color scheme to html with class', () => {
    const defaultMode = 'dark'

    const { container } = render(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeSelector='class'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement).toHaveClass('dark')
  })

  it('should set `dark` color scheme to body', () => {
    const defaultMode = 'dark'

    const { container } = render(
      <InitColorSchemeScript
        defaultMode={defaultMode}
        colorSchemeNode='document.body'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(document.body.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR)).toBe(
      'dark',
    )
  })

  it('should use forced mode if provided', () => {
    const forcedMode = 'dark'

    const { container } = render(
      <InitColorSchemeScript forcedMode={forcedMode} defaultMode='light' />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR),
    ).toBe(forcedMode)
  })

  it('should use localStorage value if available', () => {
    window.localStorage.setItem(DEFAULT_STORAGE_KEY, 'dark')

    const { container } = render(
      <InitColorSchemeScript
        modeStorageKey={DEFAULT_STORAGE_KEY}
        defaultMode='light'
      />,
    )
    eval(container.firstElementChild!.textContent!)
    expect(
      document.documentElement.getAttribute(DEFAULT_COLOR_SCHEME_SELECTOR),
    ).toBe('dark')
  })
})

describe('ColorSchemeProvider', () => {
  it('should render with default props', () => {
    const originalMatchMedia = window.matchMedia

    // @ts-expect-error
    window.matchMedia = createMatchMedia(false)
    render(<ColorSchemeProvider />)

    expect(document.documentElement.getAttribute('data-color-scheme')).toBe(
      'light',
    )
    expect(localStorage.getItem('color-scheme')).toBe('system')
    window.matchMedia = originalMatchMedia
  })
})
