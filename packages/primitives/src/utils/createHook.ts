import type { HookProps, HTMLProps, HTMLElements } from './types'

type HookReturnType<Element extends HTMLElements, State> = {
  props: HTMLProps<Element>
  state: State
}

export function createHook<
  E extends HTMLElements,
  P extends Record<string, any>,
  S extends Record<string, any>,
>(hook: (props: HookProps<E, P>) => any) {
  return <T extends HTMLElements = E>(
    props: HookProps<T, P>,
  ): HookReturnType<T, S> => hook(props as unknown as HookProps<E, P>)
}
