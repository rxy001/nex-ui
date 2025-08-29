import { testVariantClasses } from './testVariantClasses'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

type Radius = 'sm' | 'md' | 'lg' | 'full' | 'none'

const radii: Radius[] = ['sm', 'md', 'lg', 'full', 'none']

/**
 * Test the radius classes of a component.
 * @param component The component to test.
 * @param classes The expected classes for each radius variant.
 * @param options Additional options for rendering the component.
 *
 * @example
 * testRadiusClasses(<Button />, buttonClasses)
 */
export const testRadiusClasses = (
  component: ReactElement<{
    radius?: Radius
  }>,
  classes: Record<`radius-${Radius}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['radius', radii], classes, options)
}
