import { ReactElement } from 'react'
import { RenderWithNexUIProviderOptions } from './renderWithProvider'
import { testVariantClasses } from './testVariantClasses'

type Radius = 'sm' | 'md' | 'lg' | 'full' | 'none'

const radii: Radius[] = ['sm', 'md', 'lg', 'full', 'none']

export const testRadiusClasses = (
  component: ReactElement<{
    radius?: Radius
  }>,
  classes: Record<`radius-${Radius}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['radius', radii], classes, options)
}
