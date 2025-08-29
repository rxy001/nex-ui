import { testVariantClasses } from './testVariantClasses'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

type Size = 'sm' | 'md' | 'lg'

const sizes: Size[] = ['sm', 'md', 'lg']

/**
 * Tests size variant classes for a React component.
 *
 * @param component - The component to test.
 * @param classes - The expected class names for each variant value.
 * @param options - Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 * ```tsx
 * testSizeClasses(
 *   <Button />,
 *   buttonClasses
 * );
 * ```
 */
export const testSizeClasses = (
  component: ReactElement<{
    size?: Size
  }>,
  classes: Record<`size-${Size}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['size', sizes], classes, options)
}
