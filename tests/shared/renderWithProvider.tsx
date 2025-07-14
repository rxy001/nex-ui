import { render } from '@testing-library/react'
import { NexUIProvider } from '../../packages/react/src'
import { SystemProvider } from '../../packages/system/src'
import type { ReactNode } from 'react'

export const renderWithNexUIProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
  })
}

export const renderWithSystemProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <SystemProvider>{props.children}</SystemProvider>,
  })
}
