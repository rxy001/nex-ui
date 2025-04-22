import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { NexUIProvider } from '../../packages/react/src'
import { SystemProvider } from '../../packages/system/src'

export const renderWithNexProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
  })
}

export const renderWithCSSProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <SystemProvider>{props.children}</SystemProvider>,
  })
}
