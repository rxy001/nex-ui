import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

export const testClassesForwarding = <S extends string>(
  Component: ReactElement<{ classes?: Record<S, any> }>,
  slots: readonly S[],
  classes: Record<S, string>,
  testClasses: Record<S, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`should forward classes to ${slots.join(', ')} slots`, async () => {
    const { queryByClassName } = await Promise.resolve(
      renderWithNexUIProvider(cloneElement(Component, { classes }), options),
    )

    slots.forEach((slot: S) => {
      const slotElement = queryByClassName(testClasses[slot])
      expect(slotElement).toHaveClass(classes[slot])
    })
  })
}
