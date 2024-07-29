import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
// eslint-disable-next-line import/no-relative-packages
import { NexProvider } from '../../packages/nex-react/src'

export const renderWithProvider = (component: ReactNode) => {
  return render(<NexProvider>{component}</NexProvider>)
}
