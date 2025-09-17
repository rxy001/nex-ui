import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

/**
 * Test the stability of a component by ensuring it can be updated and unmounted without errors.
 * @param component The component to test.
 * @param options Options to pass to the renderWithNexUIProvider function.
 */
export const testComponentStability = (
  component: ReactElement,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`component could be updated and unmounted without errors`, async () => {
    const { unmount, rerender } = await renderWithNexUIProvider(
      component,
      options,
    )

    expect(() => {
      rerender(component)
      unmount()
    }).not.toThrow()
  })
}
