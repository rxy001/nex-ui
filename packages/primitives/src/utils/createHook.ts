import type { HookProps, HTMLProps, HTMLElements, Directory } from './types'

type HookReturnType<Element extends HTMLElements, State, Context> = {
  props: HTMLProps<Element>
  state: State
  context: Context extends Directory ? Context : never
}

export function createHook<
  E extends HTMLElements,
  P extends Directory,
  S extends Directory,
  C extends Directory | never = never,
>(hook: (props: HookProps<E, P>) => any) {
  return <T extends HTMLElements = E>(
    props: HookProps<T, P>,
  ): HookReturnType<T, S, C> => hook(props as unknown as HookProps<E, P>)
}
