import {
  renderWithNexUIProvider,
  RenderWithNexUIProviderOptions,
} from './renderWithProvider'
import type { ReactElement } from 'react'

export const testComponentStability = (
  component: ReactElement,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`component could be updated and unmounted without errors`, async () => {
    const { unmount, rerender } = await Promise.resolve(
      renderWithNexUIProvider(component, options),
    )

    expect(() => {
      rerender(component)
      unmount()
    }).not.toThrow()
  })
}
