import type { ComponentType } from 'react'
import { it, expect } from '@jest/globals'
import { renderWithNexProvider } from './renderWithProvider'

export const mountTest = (Component: ComponentType) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = renderWithNexProvider(<Component />)
    expect(() => {
      rerender(<Component />)
      unmount()
    }).not.toThrow()
  })
}
