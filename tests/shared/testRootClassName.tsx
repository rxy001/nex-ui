import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactNode } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

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
