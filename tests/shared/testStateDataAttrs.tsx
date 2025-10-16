import { cloneElement } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

export function testStateDataAttrs(
  component: ReactElement<{
    open?: boolean
    className?: string
  }>,
  options?: RenderWithNexUIProviderOptions,
) {
  const states = [true, false]
  const propName = 'open'

  it(`should have the appropriate data-state-* attribute on element based on open prop`, async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {states.map((state) =>
          cloneElement(component, {
            key: `${state}`,
            [propName]: state,
            className: `${propName}-${state}`,
          }),
        )}
      </>,
      options,
    )

    states.forEach((state) => {
      const attrKey = `data-state`
      const element = queryByClassName(`${propName}-${state}`)

      expect(element).toHaveAttribute(attrKey, state ? 'open' : 'closed')
    })
  })
}
