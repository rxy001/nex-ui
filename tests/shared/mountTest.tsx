import type { ComponentType } from 'react'
import { it, expect } from '@jest/globals'
import { render } from '@testing-library/react'

export const mountTest = (Component: ComponentType) => {
  it(`component could be updated and unmounted without errors`, () => {
    const { unmount, rerender } = render(<Component />)
    expect(() => {
      rerender(<Component />)
      unmount()
    }).not.toThrow()
  })
}
