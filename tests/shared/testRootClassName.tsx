import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

/**
 * Test the root class name of a component.
 *
 * @param component The component to test.
 * @param options Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 * testRootClassName(<Button />)
 */
export const testRootClassName = (
  component: ReactElement<{ className?: string }>,
  options?: RenderWithNexUIProviderOptions,
) => {
  it('should have the correct root class name', async () => {
    const className = 'test-class'
    const { container } = await renderWithNexUIProvider(
      cloneElement(component, { className }),
      options,
    )

    const rootElement = container.lastElementChild
    expect(rootElement).toHaveClass(className)
  })
}
