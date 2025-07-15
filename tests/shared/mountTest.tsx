import {
  renderWithNexUIProvider,
  RenderWithNexUIProviderOptions,
} from './renderWithProvider'
import type { ReactElement } from 'react'

export const mountTest = (
  Component: ReactElement,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`component could be updated and unmounted without errors`, async () => {
    const { unmount, rerender } = await Promise.resolve(
      renderWithNexUIProvider(Component, options),
    )

    expect(() => {
      rerender(Component)
      unmount()
    }).not.toThrow()
  })
}
