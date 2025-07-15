import {
  render,
  act,
  RenderResult,
  RenderOptions,
} from '@testing-library/react'
import { SystemProvider } from '../../packages/system/src'
import { NexUIProvider } from '../../packages/react/src'
import type { ReactNode } from 'react'

export interface RenderWithNexUIProviderOptions
  extends Omit<RenderOptions, 'wrapper'> {
  useAct?: boolean
}

export function renderWithNexUIProvider(
  component: ReactNode,
  options: RenderWithNexUIProviderOptions & { useAct: true },
): Promise<RenderResult>
export function renderWithNexUIProvider(
  component: ReactNode,
  options?: RenderWithNexUIProviderOptions,
): RenderResult
export function renderWithNexUIProvider(
  component: ReactNode,
  options?: RenderWithNexUIProviderOptions,
): Promise<RenderResult> | RenderResult {
  const { useAct = false, ...other } = options || {}

  if (useAct) {
    const asyncRender = async () => {
      return render(component, {
        wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
        ...other,
      })
    }
    return new Promise((resolve) => {
      act(asyncRender).then((result) => {
        resolve(result)
      })
    })
  }

  return render(component, {
    wrapper: (props) => <NexUIProvider>{props.children}</NexUIProvider>,
    ...other,
  })
}

export const renderWithSystemProvider = (component: ReactNode) => {
  return render(component, {
    wrapper: (props) => <SystemProvider>{props.children}</SystemProvider>,
  })
}
