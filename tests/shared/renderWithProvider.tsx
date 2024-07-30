import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
// eslint-disable-next-line import/no-relative-packages
import { NexProvider } from '../../packages/react/src'

// eslint-disable-next-line import/no-relative-packages
import { CSSSystemProvider } from '../../packages/system/src'

export const renderWithNexProvider = (component: ReactNode) => {
  return render(<NexProvider>{component}</NexProvider>)
}

export const renderWithCSSProvider = (component: ReactNode) => {
  return render(<CSSSystemProvider>{component}</CSSSystemProvider>)
}
