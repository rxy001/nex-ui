import { testVariantDataAttrs } from './testVariantDataAttrs'
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
 * Tests that a React component properly applies color data attributes based on the color prop.
 *
 * @param component - The React element to test.
 * @param options - Options to pass to the renderWithNexUIProvider function.
 *
 * @example
 *
 * testColorDataAttrs(<Button />);
 */

export const testColorDataAttrs = (
  component: ReactElement<{
    color?: Color
  }>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantDataAttrs(component, ['color', colors], options)
}
