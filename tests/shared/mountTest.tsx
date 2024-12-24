import type { ReactNode } from 'react'
import { it, expect } from '@jest/globals'
import { renderWithNexProvider } from './renderWithProvider'

export const mountTest = (Component: ReactNode) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = renderWithNexProvider(Component)
    expect(() => {
      rerender(Component)
      unmount()
    }).not.toThrow()
  })
}
