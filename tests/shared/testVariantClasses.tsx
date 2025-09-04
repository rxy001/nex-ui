import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import { camelToKebab } from './utils'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'
import type { CamelToKebab } from './utils'

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
 *
 * @example
 *
 * testVariantClasses(
 *   <Button />,
 *   ['disabled', [true, false]],
 *   buttonClasses,
 * )
 */

export function testVariantClasses<
  T extends string,
  C extends boolean,
  K extends Record<CamelToKebab<T>, string>,
>(
  component: ReactElement,
  variant: [T, C[]],
  classes: K,
  options?: RenderWithNexUIProviderOptions,
): void
export function testVariantClasses<
  T extends string,
  C extends string,
  K extends Record<CamelToKebab<`${T}-${C}`>, string>,
>(
  component: ReactElement,
  variant: [T, C[]],
  classes: K,
  options?: RenderWithNexUIProviderOptions,
): void
export function testVariantClasses<
  T extends string,
  C extends string | boolean,
  K extends
    | Record<CamelToKebab<`${T}-${C}`>, string>
    | Record<CamelToKebab<T>, string>,
>(
  component: ReactElement,
  variant: [T, C[]],
  classes: K,
  options?: RenderWithNexUIProviderOptions,
) {
  const [variantName, variantValues] = variant

  it(`should add the appropriate ${variantName} class to root element based on ${variantName} prop`, async () => {
    const { container } = await Promise.resolve(
      renderWithNexUIProvider(
        <>
          {variantValues.map((value) =>
            cloneElement(component, {
              [variantName]: value,
              key: `${value}`,
            }),
          )}
        </>,
        options,
      ),
    )
    const children = container.children
    const kebabVariantName = camelToKebab(variantName)

    variantValues.forEach((value: C, index) => {
      if (typeof value === 'string') {
        const classKey =
          `${kebabVariantName}-${value}` as CamelToKebab<`${T}-${C}`>
        const expectedClass = (
          classes as Record<CamelToKebab<`${T}-${C}`>, string>
        )[classKey]
        expect(children[index]).toHaveClass(expectedClass)
        return
      }

      if (typeof value === 'boolean') {
        const classKey = kebabVariantName as CamelToKebab<T>
        const expectedClass = (classes as Record<CamelToKebab<T>, string>)[
          classKey
        ]
        if (value === true) {
          expect(children[index]).toHaveClass(expectedClass)
        } else {
          expect(children[index]).not.toHaveClass(expectedClass)
        }
      }
    })
  })
}
