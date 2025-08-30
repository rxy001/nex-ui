import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

/**
 * Test the variant classes of a component.
 * @param component The component to test.
 * @param variant The variant prop and its possible values.
 * @param classes The expected class names for each variant value.
 * @param options Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 *
 * testVariantClasses(
 *   <Button />,
 *   ['variant', ['outlined', 'solid']],
 *   buttonClasses,
 * )
 */
export const testVariantClasses = <
  T extends string,
  C extends string,
  K extends Record<`${T}-${C}`, string>,
>(
  component: ReactElement,
  variant: [T, C[]],
  classes: K,
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

    variantValues.forEach((value: C, index) => {
      const classKey = `${variantName}-${value}` as `${T}-${C}`
      expect(children[index]).toHaveClass(classes[classKey])
    })
  })
}
