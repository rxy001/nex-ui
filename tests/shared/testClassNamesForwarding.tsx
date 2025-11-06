import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import { kebabCase } from './utils'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'
import type { KebabCase } from './utils'

export const testClassNamesForwarding = <S extends string>(
  Component: ReactElement<{ classNames?: Record<S, any> }>,
  slots: readonly S[],
  testClasses: Record<S, string>,
  classes: Record<KebabCase<S>, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`should forward classNames to ${slots.join(', ')} slots`, async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      cloneElement(Component, { classNames: testClasses }),
      options,
    )

    slots.forEach((slot: S) => {
      const slotElement = queryByClassName(
        classes[kebabCase(slot) as KebabCase<S>],
      )
      expect(slotElement).toHaveClass(testClasses[slot])
    })
  })
}
