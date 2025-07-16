import {
  renderWithNexUIProvider,
  RenderWithNexUIProviderOptions,
} from './renderWithProvider'
import type { ReactNode } from 'react'

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
