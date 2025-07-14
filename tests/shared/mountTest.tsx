import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'

export const mountTest = (Component: ReactElement) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = renderWithNexUIProvider(Component)
    expect(() => {
      rerender(Component)
      unmount()
    }).not.toThrow()
  })
}
