import { ReactElement } from 'react'
import { RenderWithNexUIProviderOptions } from './renderWithProvider'
import { testVariantClasses } from './testVariantClasses'

type Size = 'sm' | 'md' | 'lg'

const sizes: Size[] = ['sm', 'md', 'lg']

export const testSizeClasses = (
  component: ReactElement<{
    size?: Size
  }>,
  classes: Record<`size-${Size}`, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  testVariantClasses(component, ['size', sizes], classes, options)
}
