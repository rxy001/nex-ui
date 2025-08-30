import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactNode } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

/**
 * Test the root class name of a component.
 *
 * @param component The component to test.
 * @param className The expected root class name.
 * @param options Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 * testRootClassName(<Button className='test-class'/>, 'test-class')
 */
export const testRootClassName = (
  component: ReactNode,
  className: string,
  options?: RenderWithNexUIProviderOptions,
) => {
  it('should have the correct root class name', async () => {
    const { container } = await Promise.resolve(
      renderWithNexUIProvider(component, options),
    )
    const rootElement = container.firstElementChild
    expect(rootElement).toHaveClass(className)
  })
}
