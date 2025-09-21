import { testVariantDataAttrs } from './testVariantDataAttrs'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

type Radius = 'sm' | 'md' | 'lg' | 'full' | 'none'

const radii: Radius[] = ['sm', 'md', 'lg', 'full', 'none']

/**
 * Tests that a React component properly applies radius data attributes based on the radius prop.
 *
 * @param component The component to test.
 * @param options Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 * testRadiusDataAttrs(<Button />)
 */
export const testRadiusDataAttrs = (
  component: ReactElement<{
    radius?: Radius
  }>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantDataAttrs(component, ['radius', radii], options)
}
