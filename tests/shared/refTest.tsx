import { cloneElement, createRef } from 'react'
import type { ReactElement, Ref } from 'react'
import { renderWithNexProvider } from './renderWithProvider'

export const refTest = (component: ReactElement<{ ref: Ref<any> }>) => {
  it('ref should be forwarded', () => {
    const ref = createRef<any>()
    renderWithNexProvider(
      cloneElement(component, { ...(component.props ?? {}), ref }),
    )
    expect(ref.current).not.toBeNull()
  })
}
