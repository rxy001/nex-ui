import { render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SystemProvider } from '../../packages/system/src'
import { NexUIProvider } from '../../packages/react/src'
import type { RenderResult, RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { UserEvent, Options } from '@testing-library/user-event'

export interface RenderWithNexUIProviderOptions
  extends Omit<RenderOptions, 'wrapper'> {
  useAct?: boolean
  userEventOptions?: Options
}

export interface RenderResultWithProvider extends RenderResult {
  user: UserEvent
  queryByClassName: (className: string) => Element | null
  queryAllByClassName: (className: string) => NodeListOf<Element>
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
  const { useAct = false, userEventOptions, ...other } = options || {}

  function r() {
    const result = render(component, {
      wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
      ...other,
    })

    return {
      ...result,
      user: userEvent.setup(userEventOptions),
      queryByClassName: (className: string) =>
        document.body.querySelector(`.${className}`),
      queryAllByClassName: (className: string) =>
        document.body.querySelectorAll(`.${className}`),
    }
  }

  if (useAct) {
    const asyncRender = async () => r()

    return new Promise((resolve) => {
      act(asyncRender).then((result) => {
        resolve(result)
      })
    })
  }

  return r()
}

export const renderWithSystemProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <SystemProvider>{props.children}</SystemProvider>,
  })
}
