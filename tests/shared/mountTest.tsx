import { renderWithNexProvider } from './renderWithProvider'
import type { ReactNode } from 'react'

export const mountTest = (Component: ReactNode) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = renderWithNexProvider(Component)
    expect(() => {
      rerender(Component)
      unmount()
    }).not.toThrow()
  })
}
