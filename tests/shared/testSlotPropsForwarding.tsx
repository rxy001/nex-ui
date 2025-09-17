import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import { camelToKebab } from './utils'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'
import type { CamelToKebab } from './utils'

export const testSlotPropsForwarding = <S extends string>(
  Component: ReactElement<{ slotProps?: Record<S, any> }>,
  slots: readonly S[],
  slotProps: Record<S, { className: string }>,
  classes: Record<CamelToKebab<S>, string>,
  options?: RenderWithNexUIProviderOptions,
) => {
  it(`should forward slotProps to ${slots.join(', ')} slots`, async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      cloneElement(Component, { slotProps }),
      options,
    )

    slots.forEach((slot: S) => {
      const slotElement = queryByClassName(
        classes[camelToKebab(slot) as CamelToKebab<S>],
      )
      expect(slotElement).toHaveClass(slotProps[slot].className)
    })
  })
}
