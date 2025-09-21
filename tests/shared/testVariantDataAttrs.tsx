import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import { camelToKebab } from './utils'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

/**
 * Tests that a React component properly sets data attributes based on variant props.
 *
 * This function generates a test case that verifies a component correctly applies
 * data attributes in kebab-case format (e.g., `data-variant-name="value"`) based on
 * the provided variant prop values.
 *
 * @param component - The React element to test
 * @param variant - A tuple containing the variant name and an array of possible values
 * @param options - Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 *
 * testVariantDataAttrs(
 *   <Button />,
 *   ['size', ['small', 'medium', 'large']],
 * )
 *
 * @example
 *
 * testVariantDataAttrs(
 *   <Button />,
 *   ['disabled', [true, false]],
 * )
 */
export function testVariantDataAttrs(
  component: ReactElement,
  variant: [string, (string | boolean)[]],
  options?: RenderWithNexUIProviderOptions,
) {
  const [variantName, variantValues] = variant

  it(`should have the appropriate data-${variantName}-* attribute on element based on ${variantName} prop`, async () => {
    const { container } = await renderWithNexUIProvider(
      <>
        {variantValues.map((value) =>
          cloneElement(component, {
            [variantName]: value,
            key: `${value}`,
          }),
        )}
      </>,
      options,
    )
    const children = container.children
    const kebabVariantName = camelToKebab(variantName)

    variantValues.forEach((value, index) => {
      const attrKey = `data-${kebabVariantName}`
      const element = children[index]

      if (typeof value === 'boolean') {
        expect(element).toHaveAttribute(attrKey, String(value))
      } else {
        expect(element).toHaveAttribute(attrKey, value)
      }
    })
  })
}
