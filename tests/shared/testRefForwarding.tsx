import { cloneElement, createRef } from 'react'
import { renderWithNexUIProvider } from './renderWithProvider'
import type { ReactElement } from 'react'
import type { RenderWithNexUIProviderOptions } from './renderWithProvider'

export function testRefForwarding(
  component: ReactElement<{ ref?: React.Ref<unknown> }>,
  constructor?: Function,
): void
export function testRefForwarding(
  component: ReactElement<{ ref?: React.Ref<unknown> }>,
  options?: RenderWithNexUIProviderOptions,
): void
export function testRefForwarding(
  component: ReactElement<{ ref?: React.Ref<unknown> }>,
  constructor?: Function,
  options?: RenderWithNexUIProviderOptions,
): void
export function testRefForwarding(
  component: ReactElement<{ ref?: React.Ref<unknown> }>,
  constructor?: Function | RenderWithNexUIProviderOptions,
  options?: RenderWithNexUIProviderOptions,
) {
  let c = constructor as RenderWithNexUIProviderOptions | undefined
  let o = options

  if (Object.prototype.toString.call(c) === '[object Object]') {
    o = c as RenderWithNexUIProviderOptions
    c = undefined
  }

  it('should forward ref to appropriate element', async () => {
    const ref = createRef<HTMLElement>()

    const { container } = await Promise.resolve(
      renderWithNexUIProvider(cloneElement(component, { ref }), o),
    )

    if (c) {
      expect(ref.current).toBeInstanceOf(c)
      return
    }
    expect(ref.current).toBe(container.firstElementChild)
  })
}
