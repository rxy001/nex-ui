import {
  render,
  act,
  RenderResult,
  RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SystemProvider } from '../../packages/system/src'
import { NexUIProvider } from '../../packages/react/src'
import type { ReactNode } from 'react'
import type { UserEvent } from '@testing-library/user-event'

export interface RenderWithNexUIProviderOptions
  extends Omit<RenderOptions, 'wrapper'> {
  useAct?: boolean
}

export interface RenderResultWithProvider extends RenderResult {
  user: UserEvent
}

export function renderWithNexUIProvider(
  component: ReactNode,
  options: RenderWithNexUIProviderOptions & { useAct: true },
): Promise<RenderResultWithProvider>
export function renderWithNexUIProvider(
  component: ReactNode,
  options?: RenderWithNexUIProviderOptions,
): RenderResultWithProvider
export function renderWithNexUIProvider(
  component: ReactNode,
  options?: RenderWithNexUIProviderOptions,
): Promise<RenderResultWithProvider> | RenderResultWithProvider {
  const { useAct = false, ...other } = options || {}

  if (useAct) {
    const asyncRender = async () => {
      return {
        ...render(component, {
          wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
          ...other,
        }),
        user: userEvent.setup(),
      }
    }
    return new Promise((resolve) => {
      act(asyncRender).then((result) => {
        resolve(result)
      })
    })
  }

  return {
    ...render(component, {
      wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
      ...other,
    }),
    user: userEvent.setup(),
  }
}

export const renderWithSystemProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <SystemProvider>{props.children}</SystemProvider>,
  })
}
