import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import { camelToKebab } from './utils'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'
import type { CamelToKebab } from './utils'

export const testClassNamesForwarding = <S extends string>(
  Component: ReactElement<{ classNames?: Record<S, any> }>,
  slots: readonly S[],
  testClasses: Record<S, string>,
  classes: Record<CamelToKebab<S>, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`should forward classNames to ${slots.join(', ')} slots`, async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      cloneElement(Component, { classNames: testClasses }),
      options,
    )

    slots.forEach((slot: S) => {
      const slotElement = queryByClassName(
        classes[camelToKebab(slot) as CamelToKebab<S>],
      )
      expect(slotElement).toHaveClass(testClasses[slot])
    })
  })
}
