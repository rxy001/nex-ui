import { testVariantClasses } from './testVariantClasses'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

type Color =
  | 'red'
  | 'blue'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'gray'
  | 'yellow'
  | 'green'

const colors: Color[] = [
  'red',
  'blue',
  'cyan',
  'orange',
  'pink',
  'purple',
  'gray',
  'yellow',
  'green',
]

/**
 * Tests color variant classes for a React component.
 *
 * @param component - The component to test.
 * @param classes - The expected class names for each variant value.
 * @param options - Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 * ```tsx
 * testColorClasses(
 *   <Button />,
 *   buttonClasses
 * );
 * ```
 */

export const testColorClasses = (
  component: ReactElement<{
    color?: Color
  }>,
  classes: Record<`color-${Color}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['color', colors], classes, options)
}
