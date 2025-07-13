import { renderWithNexProvider } from './renderWithProvider'
import type { ReactElement } from 'react'

export const mountTest = (Component: ReactElement) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = renderWithNexProvider(Component)
    expect(() => {
      rerender(Component)
      unmount()
    }).not.toThrow()
  })
}
