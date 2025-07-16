import { cloneElement, ReactElement } from 'react'
import {
  renderWithNexUIProvider,
  RenderWithNexUIProviderOptions,
} from './renderWithProvider'

export const testVariantClasses = (
  component: ReactElement,
  variant: [string, string[]],
  classes: Record<string, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  const [variantName, variantValues] = variant

  it(`should add the appropriate ${variantName} class to root element based on ${variantName} prop`, async () => {
    const { container } = await renderWithNexUIProvider(
      <>
        {variantValues.map((value) =>
          cloneElement(component, {
            [variantName]: value,
            key: value,
          }),
        )}
      </>,
      options,
    )
    const children = container.children

    variantValues.forEach((value, index) => {
      const classKey = `${variantName}-${value}`
      expect(children[index]).toHaveClass(classes[classKey])
    })
  })
}
