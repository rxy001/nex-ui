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

export const testColorClasses = (
  component: ReactElement<{
    color?: Color
  }>,
  classes: Record<`color-${Color}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['color', colors], classes, options)
}
