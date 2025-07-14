import { renderWithNexUIProvider } from './renderWithProvider'
import type { FC } from 'react'

export const rootClassNameTest = (
  Component: FC<{ className?: string }>,
  className: string,
) => {
  it('should have the correct root class name', () => {
    const { container } = renderWithNexUIProvider(
      <Component className={className} />,
    )
    const rootElement = container.firstChild
    expect(rootElement).toHaveClass(className)
  })
}
