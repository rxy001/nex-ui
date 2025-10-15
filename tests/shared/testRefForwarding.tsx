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
  component: ReactElement<{ ref?: React.Ref<unknown>; 'data-testid'?: string }>,
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
    const testid = 'test-ref'

    const { getByTestId } = await renderWithNexUIProvider(
      cloneElement(component, { ref, 'data-testid': testid }),
      o,
    )

    if (c) {
      expect(ref.current).toBeInstanceOf(c)
      return
    }
    expect(getByTestId(testid)).toBe(ref.current)
  })
}
