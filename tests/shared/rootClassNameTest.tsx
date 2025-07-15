import {
  renderWithNexUIProvider,
  RenderWithNexUIProviderOptions,
} from './renderWithProvider'
import type { ReactNode } from 'react'

export const rootClassNameTest = (
  Component: ReactNode,
  className: string,
  options?: RenderWithNexUIProviderOptions,
) => {
  it('should have the correct root class name', async () => {
    const { container } = await Promise.resolve(
      renderWithNexUIProvider(Component, options),
    )
    const rootElement = container.firstElementChild
    expect(rootElement).toHaveClass(className)
  })
}
