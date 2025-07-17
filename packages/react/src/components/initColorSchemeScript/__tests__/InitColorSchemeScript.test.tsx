import { render } from '@testing-library/react'
import { InitColorSchemeScript } from '../index'

describe('InitColorSchemeScript', () => {
  it('should render with default props', () => {
    const originalMatchMedia = window.matchMedia

    // @ts-expect-error
    window.matchMedia = () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    })

    const { container } = render(<InitColorSchemeScript />)

    eval(container.firstElementChild!.textContent!)
    expect(document.documentElement).toHaveAttribute('data-nui-color-scheme')

    window.matchMedia = originalMatchMedia
  })
})
