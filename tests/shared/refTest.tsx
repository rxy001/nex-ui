import { cloneElement, createRef } from 'react'
import type { ReactElement } from 'react'
import { renderWithNexProvider } from './renderWithProvider'

export const refTest = (component: ReactElement) => {
  it('ref should be forwarded', () => {
    const ref = createRef<any>()
    renderWithNexProvider(
      cloneElement(component, { ref, props: component.props }),
    )
    expect(ref.current).not.toBeNull()
  })
}
