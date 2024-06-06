import { createRef } from 'react'
import type { ComponentType, RefAttributes } from 'react'
import { it, expect } from '@jest/globals'
import { render } from '@testing-library/react'

export const refTest = (Component: ComponentType<RefAttributes<any>>) => {
  it('ref should be forwarded', () => {
    const ref = createRef<HTMLButtonElement>()

    render(<Component ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
}
