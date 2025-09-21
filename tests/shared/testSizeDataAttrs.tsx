import { testVariantDataAttrs } from './testVariantDataAttrs'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

type Size = 'sm' | 'md' | 'lg'

const sizes: Size[] = ['sm', 'md', 'lg']

/**
 * Tests that a React component properly applies size data attributes based on the size prop.
 *
 * @param component - The component to test.
 * @param options - Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 *
 * testSizeDataAttrs(
 *   <Button />,
 * );
 *
 */
export const testSizeDataAttrs = (
  component: ReactElement<{
    size?: Size
  }>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantDataAttrs(component, ['size', sizes], options)
}
